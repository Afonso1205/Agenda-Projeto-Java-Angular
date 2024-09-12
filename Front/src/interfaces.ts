export interface INavigationLetter {
  letter: string
  isActive: boolean
}

export interface IAddress {
  id: number
  street: string
  city: string
  state: string
  country: string
  zip: string
}

export interface IContact {
  id: number
  name: string
  phone: string
  email: string
  birthdate: string
  image: string | Blob
  theme: string
  addresses: IAddress[]
  categories: ICategory[]
  initial: string
  selected?: boolean
}

export interface ICategory {
  id: number
  name: string
  color: string
}