import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { urlFor } from '@/lib/sanity'

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images?.[0]
  const imageUrl = img
    ? typeof img === 'string' ? img : urlFor(img).width(500).height(500).url()
    : null

  return (
    <Link href={`/cakes/${product.slug.current}`}>
      <div className="card group cursor-pointer overflow-hidden">
        <div className="relative h-60 bg-[#FFF0F5] overflow-hidden">
          {imageUrl ? (
            <Image src={imageUrl} alt={product.name} fill
              className="object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🎂</div>
          )}
          {product.featured && (
            <span className="absolute top-3 left-3 bg-[#F4A7B9] text-white text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>
        <div className="p-5">
          <p className="section-label text-xs mb-1">{product.category?.name}</p>
          <h3 className="font-playfair text-lg font-semibold text-[#5C3D2E] mb-1 leading-tight">
            {product.name}
          </h3>
          {product.shortDescription && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.shortDescription}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[#5C3D2E] font-bold text-lg">₱{product.price.toLocaleString()}</span>
            <span className="text-xs text-[#F4A7B9] border border-[#F4A7B9] px-3 py-1 rounded-full group-hover:bg-[#F4A7B9] group-hover:text-white transition-colors">
              Order →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}