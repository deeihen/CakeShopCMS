import { client, urlFor } from '@/lib/sanity'
import { productBySlugQuery } from '@/lib/queries'
import { Product } from '@/types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: { current: string } }[]>(`*[_type == "product"]{ slug }`)
  return slugs.map(s => ({ slug: s.slug.current }))
}

// ✅ FIXED: params is now a Promise in Next.js 15
export default async function CakePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params  // ✅ FIXED: await params before using
  const product = await client.fetch<Product>(productBySlugQuery, { slug })
  if (!product) notFound()

  const imgs = product.images || []

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/cakes" className="text-sm text-[#F4A7B9] hover:underline mb-8 inline-block">
          ← Back to Cakes
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
          {/* Images */}
          <div>
            <div className="relative h-96 md:h-[480px] rounded-3xl overflow-hidden shadow-lg">
              {imgs[0] ? (
                <Image src={urlFor(imgs[0] as any).width(700).height(700).url()}
                  alt={product.name} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full bg-[#FFF0F5] flex items-center justify-center text-8xl">🎂</div>
              )}
            </div>
            {imgs.length > 1 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {imgs.slice(1).map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm">
                    <Image src={urlFor(img as any).width(120).height(120).url()}
                      alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="section-label mb-2">{product.category?.name}</p>
            <h1 className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-3">{product.name}</h1>
            <p className="text-3xl font-bold text-[#F4A7B9] mb-6">₱{product.price.toLocaleString()}</p>

            {product.shortDescription && (
              <p className="text-gray-500 leading-relaxed mb-6">{product.shortDescription}</p>
            )}
            {product.description && (
              <div className="prose prose-sm text-gray-500 mb-6 max-w-none">
                <PortableText value={product.description} />
              </div>
            )}

            <AddToCartButton product={product} />

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mt-8 p-4 bg-white rounded-2xl">
                <p className="font-semibold text-[#5C3D2E] mb-1">Ingredients</p>
                <p className="text-sm text-gray-400">{product.ingredients.join(', ')}</p>
              </div>
            )}
            {product.allergens && product.allergens.length > 0 && (
              <div className="mt-3 p-4 bg-[#FFF0F5] rounded-2xl">
                <p className="font-semibold text-[#5C3D2E] mb-1">⚠️ Allergens</p>
                <p className="text-sm text-gray-400">{product.allergens.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}