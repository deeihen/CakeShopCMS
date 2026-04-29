import { client } from '@/lib/sanity'
import { featuredProductsQuery, siteSettingsQuery, allCategoriesQuery } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import Image from 'next/image'
import { Product, SiteSettings, Category } from '@/types'
import { urlFor } from '@/lib/sanity'

export const revalidate = 60

export default async function HomePage() {
  const [settings, featuredProducts, categories] = await Promise.all([
    client.fetch<SiteSettings>(siteSettingsQuery),
    client.fetch<Product[]>(featuredProductsQuery),
    client.fetch<Category[]>(allCategoriesQuery),
  ])

  return (
    <>
      {/* HERO */}
      <section className="bg-[#FFF0F5] min-h-[88vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-4">Handcrafted with Love</p>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-[#5C3D2E] leading-tight mb-6">
              {settings?.heroTitle || 'Cakes for Every Celebration'}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              {settings?.heroSubtitle || 'Delicious, beautifully crafted cakes made fresh for your special moments.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/cakes" className="btn-primary">Order Now</Link>
              <Link href="/contact" className="btn-outline">Custom Cake</Link>
            </div>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {settings?.heroImage ? (
              <Image src={urlFor(settings.heroImage).width(700).height(700).url()}
                alt="Hero" fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#F4A7B9] to-[#FFD6E0] flex items-center justify-center">
                <span className="text-9xl">🎂</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featuredProducts?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="section-label mb-2">Our Specialties</p>
              <h2 className="section-title">Featured Cakes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
            <div className="text-center mt-12">
              <Link href="/cakes" className="btn-primary">View All Cakes</Link>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      {categories?.length > 0 && (
        <section className="py-20 bg-[#FFF8F0]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="section-label mb-2">Browse by Type</p>
              <h2 className="section-title">Cake Categories</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map(cat => (
                <Link key={cat._id} href={`/cakes?category=${cat.slug.current}`}
                  className="card p-6 text-center group">
                  <div className="text-4xl mb-3">🎂</div>
                  <h3 className="font-playfair font-semibold text-[#5C3D2E] group-hover:text-[#F4A7B9] transition-colors">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#F4A7B9]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl font-bold text-white mb-4">Custom Cake Orders</h2>
          <p className="text-white/90 text-lg mb-8">
            Have a special occasion? We create custom cakes tailored just for you!
          </p>
          <Link href="/contact"
            className="bg-white text-[#F4A7B9] px-10 py-3 rounded-full font-semibold hover:bg-[#FFF0F5] transition-colors">
            Get a Custom Quote
          </Link>
        </div>
      </section>
    </>
  )
}