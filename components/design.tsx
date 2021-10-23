import useSWR from "swr";
import { NFTData, NFTMetadata } from "types";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const DesignDisplay = ({ metadata, nft }: { metadata: NFTMetadata, nft: NFTData }) => {
  const { data, error } = useSWR(`/api/createDesign?address=${nft.token_address}&tokenId=${nft.token_id}`, fetcher)



  return <div>

    {data && <img src={data.url} />}

  </div>
}