'use client'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { Trash2 } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="font-playfair text-3xl font-bold text-[#5C3D2E] mb-3">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Add some cakes to get started!</p>
          <Link href="/cakes" className="btn-primary">Browse Cakes</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-8">Your Cart</h1>

        <div className="space-y-4 mb-8">
          {items.map((item, i) => {
            const img = item.product.images?.[0]
            const src = img ? (typeof img === 'string' ? img : urlFor(img).width(200).height(200).url()) : null
            const price = item.selectedSize?.price ?? item.product.price

            return (
              <div key={i} className="card p-4 flex items-center gap-4">
                {src && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={src} alt={item.product.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-playfair font-semibold text-[#5C3D2E] truncate">{item.product.name}</p>
                  {item.selectedSize && <p className="text-xs text-gray-400">{item.selectedSize.size}</p>}
                  <p className="text-[#F4A7B9] font-medium text-sm">₱{price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1 border border-gray-200 rounded-full overflow-hidden">
                  <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="px-3 py-1.5 hover:bg-gray-50 text-[#5C3D2E]">−</button>
                  <span className="px-3 py-1.5 font-medium text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="px-3 py-1.5 hover:bg-gray-50 text-[#5C3D2E]">+</button>
                </div>
                <p className="font-bold text-[#5C3D2E] w-24 text-right text-sm">
                  ₱{(price * item.quantity).toLocaleString()}
                </p>
                <button onClick={() => removeItem(item.product._id)} className="text-red-300 hover:text-red-500 ml-1">
                  <Trash2 size={16} />
                </button>
              </div>
            )
          })}
        </div>

        <div className="card p-6">
          <div className="flex justify-between text-lg font-bold text-[#5C3D2E] mb-6 pb-4 border-b">
            <span>Total</span>
            <span>₱{total.toLocaleString()}</span>
          </div>
          <Link href="/checkout"
            className="block w-full bg-[#F4A7B9] text-white py-3 rounded-full text-center font-semibold hover:bg-[#E8849A] transition-colors mb-3">
            Proceed to Checkout →
          </Link>
          <button onClick={clearCart} className="block w-full text-center text-sm text-gray-300 hover:text-gray-500">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}