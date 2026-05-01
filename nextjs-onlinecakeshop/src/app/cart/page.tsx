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
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4">
        <div className="text-center">
          {/* Illustrated empty state */}
          <div className="relative mx-auto mb-8 w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-[#F4A7B9]/15" />
            <div className="absolute inset-4 rounded-full bg-[#FFF0F5] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F4A7B9]/40" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-[#F4A7B9]/30" />
          </div>
          <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-3">Your cart is empty</h2>
          <p className="text-[#8D6E63] mb-10 max-w-xs mx-auto">Looks like you haven't added any cakes yet. Let's fix that!</p>
          <Link
            href="/cakes"
            className="inline-flex items-center gap-2 bg-[#F4A7B9] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#E8849A] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F4A7B9]/30"
          >
            Browse Our Cakes →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FFF0F5] overflow-hidden py-16">
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-[#F4A7B9]/20 pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-40px] w-52 h-52 rounded-full bg-[#FFD6E0]/30 pointer-events-none" />
        <div className="absolute top-8 left-[12%] w-3 h-3 rounded-full bg-[#F4A7B9]/50" />
        <div className="absolute bottom-8 right-[18%] w-5 h-5 rounded-full bg-[#F4A7B9]/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white border border-[#F4A7B9] text-[#C2185B] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-[#F4A7B9] inline-block" />
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-[#5C3D2E] leading-tight">
            Your <span className="text-[#F4A7B9]">Cart</span>
          </h1>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Cart items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold">Cart Items</p>
              <button
                onClick={clearCart}
                className="text-xs text-[#8D6E63] hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <Trash2 size={12} /> Clear all
              </button>
            </div>

            {items.map((item, i) => {
              const img = item.product.images?.[0]
              const src = img ? (typeof img === 'string' ? img : urlFor(img).width(200).height(200).url()) : null
              const price = item.selectedSize?.price ?? item.product.price

              return (
                <div key={i} className="bg-white border border-[#F4A7B9]/15 rounded-3xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-[#FFF0F5]">
                    {src ? (
                      <Image src={src} alt={item.product.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#F9D8E1] to-[#FCE9EF]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-playfair font-bold text-[#5C3D2E] truncate text-base">{item.product.name}</p>
                    {item.selectedSize && (
                      <span className="inline-block mt-0.5 text-xs bg-[#FFF0F5] text-[#F4A7B9] border border-[#F4A7B9]/20 px-2 py-0.5 rounded-full font-medium">
                        {item.selectedSize.size}
                      </span>
                    )}
                    <p className="text-[#F4A7B9] font-semibold text-sm mt-1">₱{price.toLocaleString()} each</p>
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-0 bg-[#FFF8F0] border border-[#F4A7B9]/20 rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-[#5C3D2E] hover:bg-[#FFF0F5] transition-colors font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-sm text-[#5C3D2E]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-[#5C3D2E] hover:bg-[#FFF0F5] transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Line total */}
                  <p className="font-bold text-[#5C3D2E] w-24 text-right text-base">
                    ₱{(price * item.quantity).toLocaleString()}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all ml-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )
            })}

            {/* Continue shopping link */}
            <div className="pt-2">
              <Link
                href="/cakes"
                className="inline-flex items-center gap-1.5 text-sm text-[#F4A7B9] hover:underline underline-offset-4 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary sticky card */}
          <div className="sticky top-24">
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-full h-full rounded-3xl bg-[#F4A7B9]/10 pointer-events-none" />
              <div className="relative bg-white border border-[#F4A7B9]/20 rounded-3xl shadow-lg overflow-hidden">

                {/* Card header */}
                <div className="bg-[#5C3D2E] px-6 py-5 relative overflow-hidden">
                  <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-[#F4A7B9]/15" />
                  <p className="text-xs text-[#F4A7B9]/80 uppercase tracking-widest font-semibold relative z-10">Summary</p>
                  <p className="font-playfair text-xl font-bold text-white relative z-10">Order Total</p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Line items summary */}
                  <div className="space-y-2.5">
                    {items.map((item, i) => {
                      const price = item.selectedSize?.price ?? item.product.price
                      return (
                        <div key={i} className="flex justify-between text-xs text-[#8D6E63]">
                          <span className="truncate mr-2">{item.product.name} × {item.quantity}</span>
                          <span className="font-medium text-[#5C3D2E] flex-shrink-0">₱{(price * item.quantity).toLocaleString()}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-t border-dashed border-gray-100 pt-3 space-y-2">
                    <div className="flex justify-between text-sm text-[#8D6E63]">
                      <span>Subtotal</span>
                      <span>₱{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#8D6E63]">
                      <span>Delivery</span>
                      <span className="text-[#5BAD72] font-medium">To be arranged</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#5C3D2E] text-lg pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span>₱{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="flex items-center justify-center gap-2 w-full bg-[#F4A7B9] text-white py-4 rounded-full font-bold hover:bg-[#E8849A] transition-all hover:-translate-y-0.5 shadow-md shadow-[#F4A7B9]/30 mt-2"
                  >
                    Proceed to Checkout →
                  </Link>

                  <p className="text-xs text-gray-300 text-center">
                    Order confirmed via WhatsApp message
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}