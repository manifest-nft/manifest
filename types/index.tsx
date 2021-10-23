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

