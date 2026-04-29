import { client } from '@/lib/sanity'
import { allProductsQuery, allCategoriesQuery, productsByCategoryQuery } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import { Product, Category } from '@/types'
import Link from 'next/link'

export const revalidate = 60

interface Props { searchParams: { category?: string } }

export default async function CakesPage({ searchParams }: Props) {
  const active = searchParams.category

  const [products, categories] = await Promise.all([
    client.fetch<Product[]>(active ? productsByCategoryQuery : allProductsQuery, active ? { category: active } : {}),
    client.fetch<Category[]>(allCategoriesQuery),
  ])

  const activeName = categories.find(c => c.slug.current === active)?.name

  return (
    <div className="min-h-screen">
      <div className="bg-[#FFF0F5] py-16 text-center">
        <h1 className="font-playfair text-5xl font-bold text-[#5C3D2E] mb-2">
          {activeName ?? 'Our Cakes'}
        </h1>
        <p className="text-gray-400">{products.length} cake{products.length !== 1 ? 's' : ''} available</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link href="/cakes"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${!active ? 'bg-[#F4A7B9] text-white' : 'bg-white text-[#5C3D2E] hover:bg-[#FFF0F5]'}`}>
            All
          </Link>
          {categories.map(cat => (
            <Link key={cat._id} href={`/cakes?category=${cat.slug.current}`}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${active === cat.slug.current ? 'bg-[#F4A7B9] text-white' : 'bg-white text-[#5C3D2E] hover:bg-[#FFF0F5]'}`}>
              {cat.name}
            </Link>
          ))}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🍰</p>
            <p className="text-gray-400 text-lg">No cakes in this category yet.</p>
            <Link href="/cakes" className="mt-4 inline-block text-[#F4A7B9] hover:underline">View all</Link>
          </div>
        )}
      </div>
    </div>
  )
}