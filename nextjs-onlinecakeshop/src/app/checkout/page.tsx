'use client'
import { useCart } from '@/context/CartContext'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    notes: '', paymentMethod: 'gcash',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill in your name, email, and phone number.')
      return
    }

    const orderLines = items.map(item => {
      const price = item.selectedSize?.price ?? item.product.price
      return `• ${item.product.name}${item.selectedSize ? ` (${item.selectedSize.size})` : ''} x${item.quantity} = ₱${(price * item.quantity).toLocaleString()}`
    }).join('\n')

    const message =
      `NEW ORDER from ${form.name}\n\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email}\n` +
      `Address: ${form.address || 'For pickup'}\n` +
      `Payment: ${form.paymentMethod.toUpperCase()}\n\n` +
      `ORDER DETAILS:\n${orderLines}\n\n` +
      `TOTAL: ₱${total.toLocaleString()}\n\n` +
      `Notes: ${form.notes || 'None'}`

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/?text=${encoded}`, '_blank')

    setSubmitted(true)
    clearCart()
  }

  /* ── Empty cart ─────────────────────────────────────────────────────── */
  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative mx-auto mb-8 w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-[#F4A7B9]/15" />
            <div className="absolute inset-4 rounded-full bg-[#FFF0F5] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
          </div>
          <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-3">Your cart is empty</h2>
          <p className="text-[#8D6E63] mb-10">Add some cakes before checking out!</p>
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

  /* ── Success state ───────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Animated success ring */}
          <div className="relative mx-auto mb-8 w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-[#F4A7B9]/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-0 rounded-full bg-[#F4A7B9]/10" />
            <div className="absolute inset-4 rounded-full bg-[#FFF0F5] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#FFF0F5] border border-[#F4A7B9]/30 text-[#C2185B] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-[#F4A7B9] inline-block" />
            Order Received
          </div>

          <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-4">
            Order <span className="text-[#F4A7B9]">Sent!</span>
          </h2>
          <p className="text-[#8D6E63] leading-relaxed mb-8">
            Thank you, <span className="font-semibold text-[#5C3D2E]">{form.name || 'friend'}</span>! Your order summary has been prepared. Please send it to us via WhatsApp to confirm your order.
          </p>

          {/* Steps card */}
          <div className="bg-white border border-[#F4A7B9]/20 rounded-3xl p-6 mb-8 text-left shadow-sm">
            <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-4">What Happens Next</p>
            <div className="space-y-4">
              {[
                { step: '01', text: 'Send us the WhatsApp message that just opened' },
                { step: '02', text: 'We confirm your order within a few hours' },
                { step: '03', text: 'We send payment instructions to your number' },
                { step: '04', text: 'Your cake gets baked fresh just for you!' },
              ].map(s => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#FFF0F5] text-[#F4A7B9] text-xs font-bold flex items-center justify-center flex-shrink-0">{s.step}</span>
                  <p className="text-sm text-[#8D6E63] leading-snug pt-1.5">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#F4A7B9] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#E8849A] transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Back to Home →
          </Link>
        </div>
      </div>
    )
  }

  /* ── Main checkout ───────────────────────────────────────────────────── */
  const paymentMethods = [
    {
      value: 'gcash',
      label: 'GCash',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>,
    },
    {
      value: 'maya',
      label: 'Maya',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>,
    },
    {
      value: 'bpi',
      label: 'BPI / BDO',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    },
    {
      value: 'cod',
      label: 'Cash on Delivery',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FFF0F5] overflow-hidden py-16">
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-[#F4A7B9]/20 pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-40px] w-52 h-52 rounded-full bg-[#FFD6E0]/30 pointer-events-none" />
        <div className="absolute top-8 left-[12%] w-3 h-3 rounded-full bg-[#F4A7B9]/50" />
        <div className="absolute bottom-8 right-[18%] w-5 h-5 rounded-full bg-[#F4A7B9]/30" />
        <div className="absolute -top-4 right-[10%] w-20 h-20 rounded-full border-2 border-dashed border-[#F4A7B9]/30" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-[#F4A7B9] hover:underline underline-offset-4 font-medium mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Cart
          </Link>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-[#5C3D2E] leading-tight">
            Check<span className="text-[#F4A7B9]">out</span>
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* ── LEFT — Form ────────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Your details */}
            <div className="bg-white border border-[#F4A7B9]/15 rounded-3xl p-7 shadow-sm">
              <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-1">Step 1</p>
              <h2 className="font-playfair text-2xl font-bold text-[#5C3D2E] mb-6">Your Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'name', label: 'Full Name *', placeholder: 'Juan dela Cruz', type: 'text', col: 'sm:col-span-2' },
                  { name: 'email', label: 'Email Address *', placeholder: 'juan@email.com', type: 'email', col: '' },
                  { name: 'phone', label: 'Phone / WhatsApp *', placeholder: '+63 912 345 6789', type: 'tel', col: '' },
                  { name: 'address', label: 'Delivery Address', placeholder: 'House No., Street, Barangay, City (or leave blank for pickup)', type: 'text', col: 'sm:col-span-2' },
                ].map(f => (
                  <div key={f.name} className={f.col}>
                    <label className="block text-xs font-semibold text-[#5C3D2E] mb-1.5 uppercase tracking-wider">{f.label}</label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={(form as any)[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#F4A7B9] focus:ring-2 focus:ring-[#F4A7B9]/20 transition-all bg-[#FFF8F0] placeholder:text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white border border-[#F4A7B9]/15 rounded-3xl p-7 shadow-sm">
              <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-1">Step 2</p>
              <h2 className="font-playfair text-2xl font-bold text-[#5C3D2E] mb-6">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map(p => (
                  <button
                    key={p.value}
                    onClick={() => setForm(prev => ({ ...prev, paymentMethod: p.value }))}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold border-2 transition-all ${
                      form.paymentMethod === p.value
                        ? 'border-[#F4A7B9] bg-[#FFF0F5] text-[#5C3D2E] shadow-sm'
                        : 'border-gray-100 bg-[#FFF8F0] text-[#8D6E63] hover:border-[#F4A7B9]/50'
                    }`}
                  >
                    <span className={`${form.paymentMethod === p.value ? 'text-[#F4A7B9]' : 'text-gray-300'} transition-colors`}>
                      {p.icon}
                    </span>
                    {p.label}
                    {form.paymentMethod === p.value && (
                      <span className="ml-auto w-4 h-4 rounded-full bg-[#F4A7B9] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white border border-[#F4A7B9]/15 rounded-3xl p-7 shadow-sm">
              <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-1">Step 3</p>
              <h2 className="font-playfair text-2xl font-bold text-[#5C3D2E] mb-5">Special Notes</h2>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Any special requests? Message on the cake, allergen concerns, preferred delivery time, or anything else..."
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#F4A7B9] focus:ring-2 focus:ring-[#F4A7B9]/20 transition-all bg-[#FFF8F0] resize-none placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* ── RIGHT — Order Summary ───────────────────────────────────── */}
          <div className="sticky top-24">
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-full h-full rounded-3xl bg-[#F4A7B9]/10 pointer-events-none" />
              <div className="relative bg-white border border-[#F4A7B9]/20 rounded-3xl shadow-xl overflow-hidden">

                {/* Card header */}
                <div className="bg-[#5C3D2E] px-6 py-5 relative overflow-hidden">
                  <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-[#F4A7B9]/15" />
                  <p className="text-xs text-[#F4A7B9]/80 uppercase tracking-widest font-semibold relative z-10">Your Order</p>
                  <p className="font-playfair text-xl font-bold text-white relative z-10">Order Summary</p>
                </div>

                <div className="p-6">
                  {/* Items */}
                  <div className="space-y-3 mb-5">
                    {items.map((item, i) => {
                      const img = item.product.images?.[0]
                      const src = img
                        ? (typeof img === 'string' ? img : urlFor(img).width(120).height(120).url())
                        : null
                      const price = item.selectedSize?.price ?? item.product.price

                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#FFF0F5]">
                            {src ? (
                              <Image src={src} alt={item.product.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#F9D8E1] to-[#FCE9EF]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#5C3D2E] truncate">{item.product.name}</p>
                            {item.selectedSize && <p className="text-xs text-[#8D6E63]">{item.selectedSize.size}</p>}
                            <p className="text-xs text-[#8D6E63]">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-bold text-[#5C3D2E] flex-shrink-0">
                            ₱{(price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-t border-dashed border-gray-100 pt-4 mb-5 space-y-2">
                    <div className="flex justify-between text-sm text-[#8D6E63]">
                      <span>Subtotal</span>
                      <span>₱{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#8D6E63]">
                      <span>Delivery</span>
                      <span className="text-[#5BAD72] font-medium">To be arranged</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#5C3D2E] text-lg pt-3 border-t border-gray-100">
                      <span>Total</span>
                      <span>₱{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center gap-2 w-full bg-[#F4A7B9] text-white py-4 rounded-full font-bold hover:bg-[#E8849A] transition-all hover:-translate-y-0.5 shadow-md shadow-[#F4A7B9]/30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M11.997 0C5.373 0 0 5.373 0 12c0 2.117.554 4.104 1.523 5.831L0 24l6.335-1.492A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.624 0 11.997 0zm.003 21.818a9.818 9.818 0 0 1-5.006-1.366l-.359-.214-3.721.876.942-3.625-.234-.372A9.798 9.798 0 0 1 2.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
                    </svg>
                    Place Order via WhatsApp
                  </button>

                  <p className="text-xs text-gray-300 text-center mt-3">
                    A pre-filled message will open in WhatsApp
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