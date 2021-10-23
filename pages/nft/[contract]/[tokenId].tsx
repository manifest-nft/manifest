import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { Layout } from 'components/sections/layout';
// import { useMoralis } from 'react-moralis';
// import Web3Api from 'moralis/types/generated/web3Api';
import Moralis from 'moralis/node'
import { get721 } from 'utils/backendFns';
import { Button } from '@chakra-ui/react'
import { NFTData, NFTMetadata } from 'types';
import { DesignDisplay } from 'components/design';
import useSWR from 'swr'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<{ nft: NFTData }> = async (context) => {

  const contract = context.params!.contract as string
  const tokenId = context.params!.tokenId as string

  const nft = await get721(contract, tokenId)

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
  const [showDesign, setShowDesign] = useState(false)
  // const { authenticate, user, logout, isAuthenticated, enableWeb3, web3, Moralis } = useMoralis()
  const router = useRouter()

  const contract = router.query.contract as string
  const tokenId = router.query.tokenId as string

  const metadata = JSON.parse(nft.metadata!) as NFTMetadata


  return <Layout>
    <h2>{metadata.name}</h2>
    <img src={metadata.image} />

    <Button onClick={() => setShowDesign(true)}>Create Manifest NFT</Button>

    {showDesign && <DesignDisplay nft={nft} metadata={metadata} />}

    <pre>{JSON.stringify(nft, null, 2)}</pre>
  </Layout>
}

export default Page