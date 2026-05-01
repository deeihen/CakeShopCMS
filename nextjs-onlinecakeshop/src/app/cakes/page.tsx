import { client } from '@/lib/sanity'
import { allProductsQuery, allCategoriesQuery, productsByCategoryQuery } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import { Product, Category } from '@/types'
import Link from 'next/link'

export const revalidate = 0

interface Props {
  searchParams: Promise<{ category?: string | string[] }>
}

export default async function CakesPage({ searchParams }: Props) {
  const params = await searchParams
  const active = Array.isArray(params.category) ? params.category[0] : params.category

  const [products, categories] = await Promise.all([
    client.fetch<Product[]>(active ? productsByCategoryQuery : allProductsQuery, active ? { category: active } : {}),
    client.fetch<Category[]>(allCategoriesQuery),
  ])

  const activeName = categories.find(c => c.slug.current === active)?.name

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FFF0F5] overflow-hidden py-24">
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-[440px] h-[440px] rounded-full bg-[#F4A7B9]/20 pointer-events-none" />
        <div className="absolute bottom-[-70px] left-[-60px] w-[360px] h-[360px] rounded-full bg-[#FFD6E0]/30 pointer-events-none" />
        <div className="absolute top-16 left-[12%] w-4 h-4 rounded-full bg-[#F4A7B9]/60" />
        <div className="absolute top-28 right-[18%] w-6 h-6 rounded-full bg-[#F4A7B9]/40" />
        <div className="absolute bottom-12 left-[45%] w-3 h-3 rounded-full bg-[#5C3D2E]/20" />
        <div className="absolute -top-6 right-[10%] w-24 h-24 rounded-full border-2 border-dashed border-[#F4A7B9]/40" />
        <div className="absolute bottom-8 left-[6%] w-14 h-14 rounded-full border-2 border-dashed border-[#F4A7B9]/30" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#F4A7B9] text-[#C2185B] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F4A7B9] inline-block" />
            {active ? activeName : 'Freshly Baked Daily'}
          </div>

          <h1 className="font-playfair text-6xl md:text-7xl font-bold text-[#5C3D2E] leading-[1.1] mb-4">
            {active ? (
              <>{activeName}</>
            ) : (
              <>Our <span className="text-[#F4A7B9]">Cakes</span></>
            )}
          </h1>

          <p className="text-[#8D6E63] text-lg mb-8">
            {products.length} cake{products.length !== 1 ? 's' : ''} available
            {active && (
              <> · <Link href="/cakes" className="text-[#F4A7B9] hover:underline underline-offset-4">View all</Link></>
            )}
          </p>

          {/* Category filter pills — inside hero */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            <Link
              href="/cakes"
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-sm ${
                !active
                  ? 'bg-[#F4A7B9] text-white shadow-[#F4A7B9]/30 shadow-md'
                  : 'bg-white text-[#5C3D2E] border border-[#F4A7B9]/30 hover:bg-[#FFF0F5]'
              }`}
            >
              All
            </Link>
            {categories.map(cat => (
              <Link
                key={cat._id}
                href={`/cakes?category=${cat.slug.current}`}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-sm ${
                  active === cat.slug.current
                    ? 'bg-[#F4A7B9] text-white shadow-[#F4A7B9]/30 shadow-md'
                    : 'bg-white text-[#5C3D2E] border border-[#F4A7B9]/30 hover:bg-[#FFF0F5]'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {products.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-1">
                  {active ? activeName : 'All Cakes'}
                </p>
                <h2 className="font-playfair text-3xl font-bold text-[#5C3D2E]">
                  {active ? `${activeName} Collection` : 'Everything on the Menu'}
                </h2>
              </div>
              <span className="bg-[#FFF0F5] border border-[#F4A7B9]/30 text-[#F4A7B9] text-sm font-semibold px-4 py-2 rounded-full">
                {products.length} item{products.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-32">
            <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-[#F9D8E1] to-[#FCE9EF] flex items-center justify-center">
              <div className="w-10 h-10 rounded-2xl bg-white/60 border border-white/70" />
            </div>
            <p className="font-playfair text-2xl font-bold text-[#5C3D2E] mb-2">No cakes here yet</p>
            <p className="text-[#8D6E63] mb-8">This category is still being filled with something delicious!</p>
            <Link
              href="/cakes"
              className="inline-flex items-center gap-2 bg-[#F4A7B9] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#E8849A] transition-all hover:-translate-y-0.5 shadow-md"
            >
              View All Cakes →
            </Link>
          </div>
        )}
      </div>

      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#5C3D2E] py-16 overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-60 h-60 rounded-full bg-[#F4A7B9]/15" />
        <div className="absolute bottom-[-30px] left-[-30px] w-44 h-44 rounded-full bg-[#F4A7B9]/10" />
        <div className="relative z-10 text-center px-6">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Can't find what you're looking for?</p>
          <h2 className="font-playfair text-3xl font-bold text-white mb-6">
            We Take <span className="text-[#F4A7B9]">Custom Orders</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#F4A7B9] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#E8849A] transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Request a Custom Cake →
          </Link>
        </div>
      </section>
    </div>
  )
}