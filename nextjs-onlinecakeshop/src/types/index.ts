export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
}

export interface Category {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  image?: SanityImage
}

export interface ProductSize {
  size: string
  price: number
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: number
  images: SanityImage[] | string[]
  shortDescription?: string
  description?: any[]
  featured: boolean
  available: boolean
  sizes?: ProductSize[]
  ingredients?: string[]
  allergens?: string[]
  category: { name: string; slug: { current: string } }
}

export interface SiteSettings {
  shopName?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: SanityImage
  aboutText?: string
  contactEmail?: string
  contactPhone?: string
  address?: string
  facebookUrl?: string
  instagramUrl?: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: ProductSize
}