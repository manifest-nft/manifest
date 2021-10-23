export interface CustomError extends Error {
  status?: number;
}

export type PhysicalAddress = {
  name: string // Name of customer receiving the product
  company?: string // Optional company associated with the customer
  address1: string // Address line 1 of customer
  address2?: string // Optional address line 2 of customer
  city: string // City of customer
  state: string // State or province where customer resides
  zip: number // Zip code or postal code of customer
  country: string // ISO3166 country code, defaults to US
}

export type UriData = {
  tokenId: string // ID of token in manifest contract
  name: string // name of the NFT
  description: string // description of NFT
  image: string // image url
  ogC: string // original contract address
  ogT: string // original token ID
  ogUri: string // original URI link
  edition: number // mint edition for (ogC, ogT) pair
}

export type SaveWebhookParams = {
  // for both beforeSave and afterSave moralis webhooks
  // https://docs.moralis.io/moralis-server/cloud-code/webhooks#beforesave-webhooks, comments from documentation
  master: boolean // True if the master key was used and false otherwise.
  user?: any // If set, this will contain the Moralis user who made the request, in our REST API format.
  installationId?: string // If available, the installationId which made the request.
  object: Record<string, any> // For triggers, this will contain the Moralis object, in our REST API format. 
  triggerName: string // name of function trigger
}
