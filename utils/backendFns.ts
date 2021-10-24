import Moralis from 'moralis/node'
Moralis.start({
  appId: process.env.MORALIS_APPLICATION_ID!,
  serverUrl: process.env.MORALIS_SERVER_ID!
})


export const get721 = async (contract: string, token_id: string) => {
  try {
    const data = await Moralis.Web3API.token.getTokenIdMetadata({
      // @ts-ignore
      chain: process.env.MORALIS_CHAIN!, address: contract, token_id
    })

    return data


  } catch (e) {
    console.error(e)
    return null 
  }
}

export const Design = Moralis.Object.extend("Design")

export type DesignType = {
  spDesignId: string
  spMockupUrl: string
}
