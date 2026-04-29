export const allProductsQuery = `*[_type == "product" && available == true] | order(_createdAt desc) {
  _id, name, slug, price, shortDescription, featured, available,
  "images": images[].asset->url,
  "category": category->{ name, slug }
}`

export const featuredProductsQuery = `*[_type == "product" && featured == true && available == true][0...6] {
  _id, name, slug, price, shortDescription,
  "images": images[].asset->url,
  "category": category->{ name, slug }
}`

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id, name, slug, price, shortDescription, description, sizes, ingredients, allergens,
  images,
  "category": category->{ name, slug }
}`

export const allCategoriesQuery = `*[_type == "category"] | order(name asc) {
  _id, name, slug, description, image
}`

export const productsByCategoryQuery = `*[_type == "product" && category->slug.current == $category && available == true] | order(_createdAt desc) {
  _id, name, slug, price, shortDescription,
  "images": images[].asset->url,
  "category": category->{ name, slug }
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  shopName, heroTitle, heroSubtitle, heroImage,
  aboutText, contactEmail, contactPhone, address,
  facebookUrl, instagramUrl
}`