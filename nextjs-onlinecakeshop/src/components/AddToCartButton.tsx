'use client'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { Product, ProductSize } from '@/types'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState<ProductSize | undefined>(product.sizes?.[0])
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product, qty, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-4">
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <p className="font-semibold text-[#5C3D2E] mb-2">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(s => (
              <button key={s.size} onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  size?.size === s.size
                    ? 'bg-[#F4A7B9] text-white border-[#F4A7B9]'
                    : 'border-[#F4A7B9] text-[#5C3D2E] hover:bg-[#FFF0F5]'
                }`}>
                {s.size} — ₱{s.price.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
          <button onClick={() => setQty(q => Math.max(1, q - 1))}
            className="px-4 py-2 hover:bg-gray-50 text-[#5C3D2E]">−</button>
          <span className="px-4 py-2 font-semibold text-[#5C3D2E]">{qty}</span>
          <button onClick={() => setQty(q => q + 1)}
            className="px-4 py-2 hover:bg-gray-50 text-[#5C3D2E]">+</button>
        </div>
        <button onClick={handleAdd}
          className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
            added ? 'bg-green-400 text-white' : 'bg-[#F4A7B9] text-white hover:bg-[#E8849A]'
          }`}>
          {added ? '✓ Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}