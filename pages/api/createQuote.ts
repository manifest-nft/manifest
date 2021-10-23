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
const QUOTE = "https://api.scalablepress.com/v2/quote"


type RequestParams = {
  address: PhysicalAddress
}


type Response = {
  
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (!process.env.SP_KEY) throw "no scalable press key"

  const quote = await fetch(QUOTE, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(":" + process.env.SP_KEY).toString('base64'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      
    }),
  })
  console.log(req.body)


  res.status(200).json({ name: 'John Doe' })
}