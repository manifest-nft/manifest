import Web3Api from "moralis/types/generated/web3Api";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import useSWR from "swr";
import { NFTData, NFTMetadata } from "types";
import { Button} from '@chakra-ui/react'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ABI = [{
  "inputs": [
    {
      "internalType": "address",
      "name": "NFTContract",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    }
  ],
  "name": "submitManifest721",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}]


export const DesignDisplay = ({ metadata, nft }: { metadata: NFTMetadata, nft: NFTData }) => {
  const { web3, isWeb3Enabled, web3EnableError, enableWeb3, Moralis } = useMoralis()
  const { data, error } = useSWR(`/api/createDesign?address=${nft.token_address}&tokenId=${nft.token_id}`, fetcher)


  const { data: txData, error: txError, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: "0x55eAE1bbE7201A7D32466f928FED1c777d67a5F3",
    functionName: "submitManifest721",
    params: {
      "NFTContract": nft.token_address,
      "_tokenId": nft.token_id
    },
  })


  console.log(txData, txError, isLoading, isFetching)

  const mint = async () => {
    // if (!web3?.eth) return

    await fetch()

    

    // const contract = new web3.eth.Contract(ABI, "0x8e4B5c508207b15b01A21E6dbcde89Ba516c1c5A")
    // const params = contract.methods.submitManifest721.getData(function_parameters);
    // contract.methods.submitManifest721().send()

    // web3?.eth.sendTransaction({
    //   chain: process.env.NEXT_PUBLIC_MORALIS_CHAIN!,

    //   address: "0x8e4B5c508207b15b01A21E6dbcde89Ba516c1c5A",
    //   function_name: "submitManifest721",
    //   abi: ABI

    // })

    // const allowance = await Moralis.Web3API.native.runContractFunction({
    //   // @ts-ignore
    //   chain: process.env.NEXT_PUBLIC_MORALIS_CHAIN!,
    //   address: "0x8e4B5c508207b15b01A21E6dbcde89Ba516c1c5A",
    //   function_name: "submitManifest721",
    //   abi: ABI
    // });


    // console.log(allowance)
  }

  

  return <div>

    {data && <img src={data.url} />}

    <Button onClick={mint}>MINT</Button>

  </div>
}