import { client } from '@/lib/sanity'
import { featuredProductsQuery, siteSettingsQuery, allCategoriesQuery, allProductsQuery } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import Image from 'next/image'
import { Product, SiteSettings, Category } from '@/types'
import { urlFor } from '@/lib/sanity'

export const revalidate = 60

export default async function HomePage() {
  const [settings, featuredProducts, categories, allProducts] = await Promise.all([
    client.fetch<SiteSettings>(siteSettingsQuery),
    client.fetch<Product[]>(featuredProductsQuery),
    client.fetch<Category[]>(allCategoriesQuery),
    client.fetch<Product[]>(allProductsQuery),
  ])

  const categoryImages = allProducts.reduce<Record<string, string[]>>((acc, product) => {
    const slug = product.category?.slug?.current
    const firstImage = Array.isArray(product.images) ? product.images[0] : undefined
    if (!slug || !firstImage || typeof firstImage !== 'string') return acc
    if (!acc[slug]) acc[slug] = []
    if (!acc[slug].includes(firstImage)) acc[slug].push(firstImage)
    return acc
  }, {})

  const marqueeItems = [
    'Fresh Baked Daily',
    'Custom Orders Welcome',
    'Gift Delivery Available',
    'Made with Love',
  ]

  return (
    <>
      {/* Marquee keyframe — inline so no tailwind.config needed */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 48px;
          animation: marquee 22s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
      `}</style>

      {/* HERO */}
      <section className="relative bg-[#FFF0F5] min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-[#F4A7B9]/20 pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full bg-[#FFD6E0]/30 pointer-events-none" />
        <div className="absolute top-16 left-10 w-5 h-5 rounded-full bg-[#F4A7B9]/50" />
        <div className="absolute bottom-24 right-20 w-6 h-6 rounded-full bg-[#F4A7B9]/40" />

        <div className="max-w-6xl mx-auto px-6 py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#F4A7B9] text-[#C2185B] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F4A7B9] inline-block" />
              Handcrafted with Love
            </div>

            <h1 className="font-playfair text-5xl md:text-[64px] font-bold text-[#5C3D2E] leading-[1.1] mb-6">
              {settings?.heroTitle || (
                <>
                  Indulgence<br />
                  <span className="text-[#F4A7B9]">Delivered</span> to<br />
                  Your Door
                </>
              )}
            </h1>

            <p className="text-[#8D6E63] text-lg leading-relaxed mb-10 max-w-md">
              {settings?.heroSubtitle || 'Premium handcrafted cakes made with the finest ingredients. Experience a slice of heaven in every bite.'}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/cakes"
                className="bg-[#F4A7B9] text-white px-8 py-4 rounded-full font-semibold text-base shadow-lg hover:bg-[#e8829a] transition-all hover:-translate-y-0.5"
              >
                Order Now →
              </Link>
              <Link
                href="/contact"
                className="border-2 border-[#5C3D2E] text-[#5C3D2E] px-8 py-4 rounded-full font-semibold text-base hover:bg-[#5C3D2E] hover:text-white transition-all hover:-translate-y-0.5"
              >
                Custom Cake
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-[#F4A7B9]/40">
              {[
                { value: '500+', label: 'Cakes Delivered' },
                { value: '4.9★', label: 'Average Rating' },
                { value: '100%', label: 'Fresh Baked' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-playfair text-2xl font-bold text-[#5C3D2E]">{stat.value}</p>
                  <p className="text-xs text-[#8D6E63] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 rounded-[40px] bg-[#F4A7B9]/20 scale-105" />
            <div className="relative w-full md:max-w-[480px] h-[420px] md:h-[540px] rounded-[32px] overflow-hidden shadow-2xl">
              {settings?.heroImage ? (
                <Image
                  src={urlFor(settings.heroImage).width(800).height(800).url()}
                  alt="Featured cake"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#F9D8E1] to-[#FFD6E0] flex items-center justify-center">
                  <div className="w-28 h-28 rounded-3xl bg-white/35 border border-white/50" />
                </div>
              )}
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs text-[#8D6E63] font-medium">Starting at</p>
                <p className="font-playfair text-xl font-bold text-[#5C3D2E]">₱ 299</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full border-4 border-dashed border-[#F4A7B9]/50" />
          </div>
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <div className="bg-[#F4A7B9] py-4 overflow-hidden">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-white font-semibold text-sm flex-shrink-0">
              {item} <span className="opacity-50 ml-6">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED — only shows if data exists */}
      {featuredProducts?.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <p className="section-label mb-2">Our Specialties</p>
                <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E]">
                  Featured <span className="text-[#F4A7B9]">Cakes</span>
                </h2>
              </div>
              <Link href="/cakes" className="text-[#F4A7B9] font-semibold hover:underline underline-offset-4 text-sm tracking-wide">
                View All Cakes →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      {categories?.length > 0 && (
        <section className="py-24 bg-[#FFF8F0] relative overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#F4A7B9]/10 pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-[#5C3D2E]/5 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
              <p className="section-label mb-2">Browse by Type</p>
              <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E]">
                Cake <span className="text-[#F4A7B9]">Categories</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {categories.map(cat => (
                <Link
                  key={cat._id}
                  href={`/cakes?category=${cat.slug.current}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#F4A7B9]/20"
                >
                  <div className="h-36 bg-[#FFF0F5] relative overflow-hidden">
                    {categoryImages[cat.slug.current]?.length ? (
                      categoryImages[cat.slug.current].length > 1 ? (
                        <div className="grid h-full grid-cols-2">
                          <div className="relative overflow-hidden">
                            <Image src={categoryImages[cat.slug.current][0]} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="relative overflow-hidden">
                            <Image src={categoryImages[cat.slug.current][1]} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-full">
                          <Image src={categoryImages[cat.slug.current][0]} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )
                    ) : (
                      <div className="h-full bg-gradient-to-br from-[#F9D8E1] to-[#FCE9EF]" />
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h3 className="font-playfair font-semibold text-[#5C3D2E] group-hover:text-[#F4A7B9] transition-colors text-sm">
                      {cat.name}
                    </h3>
                    <span className="w-7 h-7 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#F4A7B9] text-xs group-hover:bg-[#F4A7B9] group-hover:text-white transition-all">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-2">Why We're Different</p>
            <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E]">
              Made with <span className="text-[#F4A7B9]">Purpose</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '01',
                title: 'Artisanal Craftsmanship',
                desc: 'Every cake is crafted with precision and care, showcasing artisanal skills that set our shop apart.',
                bg: 'bg-[#FFF0F5]',
                accent: 'text-[#F4A7B9]',
                badge: 'bg-[#F9D8E1] text-[#E395AB]',
              },
              {
                icon: '02',
                title: 'Customization Options',
                desc: 'Providing customization options allows customers to tailor their sweets exactly to their vision.',
                bg: 'bg-[#FFF8F0]',
                accent: 'text-[#E8A87C]',
                badge: 'bg-[#F8E8D8] text-[#D79A72]',
              },
              {
                icon: '03',
                title: 'Fresh Delivery',
                desc: 'We deliver your cakes fresh, ensuring every slice arrives in perfect condition for your celebration.',
                bg: 'bg-[#F0F8FF]',
                accent: 'text-[#7BAFD4]',
                badge: 'bg-[#DDEAF8] text-[#6B9BC3]',
              },
            ].map(item => (
              <div key={item.title} className={`${item.bg} rounded-3xl p-8 hover:shadow-md transition-shadow`}>
                <div className={`inline-flex h-12 min-w-12 px-3 items-center justify-center rounded-2xl text-2xl font-semibold mb-4 ${item.badge}`}>
                  {item.icon}
                </div>
                <h3 className={`font-playfair text-xl font-bold ${item.accent} mb-3`}>{item.title}</h3>
                <p className="text-[#8D6E63] leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 bg-[#5C3D2E] overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-[#F4A7B9]/15" />
        <div className="absolute bottom-[-40px] left-[-40px] w-56 h-56 rounded-full bg-[#F4A7B9]/10" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block bg-[#F4A7B9]/20 text-[#F9D8E1] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Special Orders
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Dream Cake,<br />
            <span className="text-[#F4A7B9]">Made Reality</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Have a special occasion? We create custom cakes tailored just for you — from concept to celebration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#F4A7B9] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#e8829a] transition-all shadow-lg hover:-translate-y-0.5"
            >
              Get a Custom Quote
            </Link>
            <Link
              href="/cakes"
              className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
