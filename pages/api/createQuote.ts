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
import { PhysicalAddress } from 'types'
import fetch from 'node-fetch'
import { Moralis } from 'moralis'
const QUOTE = "https://api.scalablepress.com/v2/quote"


type RequestParams = {
  erc721Address: string
  address: PhysicalAddress
  tokenId: number
}


type Response = {
  // a: number
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (!process.env.SP_KEY) throw "no scalable press key"

  const params = req.body as RequestParams

  const a = await Moralis.Web3API.token.getNFTMetadata({
    chain: "polygon", address: "0x7227e371540cf7b8e512544ba6871472031f3335"
  })

  console.log(a)

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
  console.log(req.body)


  res.status(200).json({  })
}