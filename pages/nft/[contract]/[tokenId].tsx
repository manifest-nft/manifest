import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { Layout } from 'components/sections/layout';
// import { useMoralis } from 'react-moralis';
// import Web3Api from 'moralis/types/generated/web3Api';
import Moralis from 'moralis/node'


type NFTData = {
  token_address: string;
  token_id: string;
  contract_type: string;
  token_uri?: string | undefined;
  metadata?: string | undefined;
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
}

type NFTMetadata = {
  name: string
  image: string
  description: string
}

// {"external_url":"https://portal.neondistrict.io/asset/158456339269415663040815312385",
// "name":"Bliss Manipulator: Renegade",
// "image":"https://neon-district-season-one.s3.amazonaws.com/images/blissmanipulatorr-rare-arms-female-thumb.png",
// "description":"Armor found within Neon District.\n\nA Neon District: Season One game item, playable on https://portal.neondistrict.io.\n\nNeon District is a free-to-play cyberpunk role-playing game. Collect characters and gear, craft and level up teams, and battle against other players through competitive multiplayer and in turn-based combat.","attributes":[{"trait_type":"type","value":"Armor"},{"trait_type":"rarity","value":"Rare"},{"trait_type":"level","value":3},{"display_type":"number","trait_type":"Season","value":1},{"trait_type":"Armor Slot","value":"Arms"},{"display_type":"boost_number","trait_type":"Mech","value":26},{"display_type":"boost_number","trait_type":"Nano","value":0},{"display_type":"boost_number","trait_type":"Attack","value":5},{"display_type":"boost_number","trait_type":"Health","value":10},{"display_type":"boost_number","trait_type":"Defense","value":0},{"display_type":"boost_number","trait_type":"Hacking","value":5},{"display_type":"boost_number","trait_type":"Stealth","value":0},{"display_type":"boost_number","trait_type":"Tactics","value":5}]}


// export const getServerSideProps = async () => {
//   // const res = await fetch('https://.../data')



//   // const data: Data = await res.json()

//   return {
//     props: {
//       // data,
//     },
//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps<{ nft: NFTData }> = async (context) => {

  const contract = context.params!.contract as string
  const tokenId = context.params!.tokenId as string

  Moralis.start({
    appId: process.env.MORALIS_APPLICATION_ID!,
    serverUrl: process.env.MORALIS_SERVER_ID!
    
  })

  const nft = await Moralis.Web3API.token.getTokenIdMetadata({
    chain: "polygon", address: contract, token_id: tokenId
  })

  console.log(nft)

  if (!nft.metadata) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      nft
    }
  }
}

function Page({ nft }: InferGetStaticPropsType<typeof getStaticProps>) {
  // const { authenticate, user, logout, isAuthenticated, enableWeb3, web3, Moralis } = useMoralis()
  const router = useRouter()
  // const web3Api = useMoralisWeb3Api()

  const contract = router.query.contract as string
  const tokenId = router.query.tokenId as string
  // const contract = router.query.contract as string

  // const parsed = 

  const metadata = JSON.parse(nft.metadata!) as NFTMetadata


  return <Layout>
    <h2>{metadata.name}</h2>
    <img src={metadata.image} />


    <pre>{JSON.stringify(nft, null, 2)}</pre>
  </Layout>
}

export default Page