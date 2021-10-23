//  -u ":test_GrJhVHiRB1F9T06yQ2uKQA" \
//   -d "type=dtg" \
//   -d "products[0][id]=gildan-sweatshirt-crew" \
//   -d "products[0][color]=ash" \
//   -d "products[0][quantity]=12" \
//   -d "products[0][size]=lrg" \
//   -d "address[name]=My Customer" \
//   -d "address[address1]=123 Scalable Drive" \
//   -d "address[city]=West Pressfield" \
//   -d "address[state]=CA" \
//   -d "address[zip]=12345" \
//   -d "designId=53ed3a23b3730f0e27a66513"

import type { NextApiRequest, NextApiResponse } from 'next'
import { NFTMetadata, PhysicalAddress } from 'types'
import fetch from 'node-fetch'
import Moralis from 'moralis/node'
import { Design, DesignType, get721 } from 'utils/backendFns'
import { fixIpfsUrl } from 'utils'
const SP_API = "https://api.scalablepress.com/"


type RequestParams = {
  address: string
  tokenId: string
  // address: PhysicalAddress
}


type Response = {
  // a: number
}

Moralis.start({
  appId: process.env.MORALIS_APPLICATION_ID!,
  serverUrl: process.env.MORALIS_SERVER_ID!
})

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (!process.env.SP_KEY) throw "no scalable press key"

  const params = req.query as RequestParams

  const nft = await get721(params.address, params.tokenId)
  if (!nft) {
    return res.status(404).json({})
  }

  const metadata = JSON.parse(nft.metadata!) as NFTMetadata

  const query = new Moralis.Query(Design)
  query.equalTo("contractAddress", nft.token_address)
  query.equalTo("tokenId", nft.token_id)
  // query.select("spDesignId", "spDesignId", "spDesignObject")
  const results = await query.find()

  console.log(results)

  const existingDesign = results[0]
  if (existingDesign && existingDesign.get("spDesignId")) {
    return res.status(200).json({
      id: existingDesign.get("spDesignId"),
      url: existingDesign.get("spMockupUrl"),
    })
  }

  const artwork = fixIpfsUrl(metadata.image)

  console.log("creating design")
  const designResponse = await fetch(SP_API + "v2/design", {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(":" + process.env.SP_KEY).toString('base64'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      type: "dtg",
      sides: {
        front: {
          artwork,
          // colors: ['white'],
          dimensions: {
            width: 10
          },
          position: {
            horizontal: "C",
            offset: {
              top: "2.5"
            }
          }
  //         sides[front][position][horizontal]=C" \
  // -F "sides[front][position][offset][top]=2.5" \
          // aspect: 
        }
      }
    }),
  })
  const designJson = await designResponse.json() as any
  console.log("done new design", designJson)

  if (!designJson.designId) {
    console.error("no design id returned")
    return res.status(400)
  }


  console.log("creating mockup")
  const mockupResponse = await fetch(SP_API + "v3/mockup", {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(":" + process.env.SP_KEY).toString('base64'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      template: {name: "front"},
      product: {id: "gildan-cotton-t-shirt", color: "white"},
      output: {
        width: 1000,
        height: 1000,
        format: "png"
      },
      padding: {
        height: 10
      },
      design: {
        type: "dtg",
        sides: {
          front: {
            artwork,
            // colors: ['white'],
            dimensions: {
              width: 10
            },
            position: {
              horizontal: "C",
              offset: {
                top: "2.5"
              }
            }
          }
        }
      }
    }),
  })
  const mockupJson = await mockupResponse.json() as any
  console.log("done new mockup", JSON.stringify(mockupJson))

  if (!mockupJson.url) {
    console.error("non url in the mockup")
    return res.status(400)
  }

  // -F "output[width]=1000" \
  // -F "output[height]=1000" \
  // -F "padding[height]=10" \
  // -F "output[format]=png"




  const design = new Design()
  await design.save({
    spDesignId: designJson.designId,
    spDesignObject: designJson,
    contractAddress: nft.token_address,
    tokenId: nft.token_id,
    spMockupUrl: mockupJson.url
  })


  // const design = results[0] as any as DesignType

  res.status(200).json({
    id: designJson.designId,
    url: mockupJson.url
  })


  // const quote = await fetch(QUOTE, {
  //   headers: {
  //     'Authorization': 'Basic ' + Buffer.from(":" + process.env.SP_KEY).toString('base64'),
  //     'Content-Type': 'application/json'
  //   },
  //   method: 'post',
  //   body: JSON.stringify({
  //     products: [
  //       { id: "gildan-sweatshirt-crew", color: "white" }
  //     ]
  //   }),
  // })


}