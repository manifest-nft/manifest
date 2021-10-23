export * from './smartTrim';
export * from './networks';

export const fixIpfsUrl = (s: string) => {
  if (s.startsWith("ipfs://")) {
    return `https://cloudflare-ipfs.com/ipfs/${s.split("//")[1]}`
  } else {
    return s
  }
}

