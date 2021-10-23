import Moralis from 'moralis/node'
Moralis.start({
  appId: process.env.MORALIS_APPLICATION_ID!,
  serverUrl: process.env.MORALIS_SERVER_ID!
})


export const get721 = async (contract: string, token_id: string) => {
  return Moralis.Web3API.token.getTokenIdMetadata({
    chain: "polygon", address: contract, token_id
  })
}

export const Design = Moralis.Object.extend("Design")

export type DesignType = {
  spDesignId: string
  spMockupUrl: string
}
