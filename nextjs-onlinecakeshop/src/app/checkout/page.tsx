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

    // Build WhatsApp / email order summary
    const orderLines = items.map(item => {
      const price = item.selectedSize?.price ?? item.product.price
      return `• ${item.product.name}${item.selectedSize ? ` (${item.selectedSize.size})` : ''} x${item.quantity} = ₱${(price * item.quantity).toLocaleString()}`
    }).join('\n')

    const message =
      `🎂 NEW ORDER from ${form.name}\n\n` +
      `📞 Phone: ${form.phone}\n` +
      `📧 Email: ${form.email}\n` +
      `📍 Address: ${form.address || 'For pickup'}\n` +
      `💳 Payment: ${form.paymentMethod.toUpperCase()}\n\n` +
      `ORDER DETAILS:\n${orderLines}\n\n` +
      `TOTAL: ₱${total.toLocaleString()}\n\n` +
      `📝 Notes: ${form.notes || 'None'}`

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/?text=${encoded}`, '_blank')

    setSubmitted(true)
    clearCart()
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="font-playfair text-3xl font-bold text-[#5C3D2E] mb-3">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Add some cakes before checking out!</p>
          <Link href="/cakes" className="btn-primary">Browse Cakes</Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-4">Order Sent!</h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Thank you! Your order summary has been prepared. Please send it to us via WhatsApp or message us on Facebook/Instagram to confirm your order.
          </p>
          <div className="card p-6 mb-8 text-left space-y-3">
            <p className="text-sm font-semibold text-[#5C3D2E]">What happens next?</p>
            {[
              '1. Send us the WhatsApp message that just opened',
              '2. We confirm your order within a few hours',
              '3. We send payment instructions',
              '4. Your cake gets baked fresh! 🎂',
            ].map(s => (
              <p key={s} className="text-sm text-gray-400">{s}</p>
            ))}
          </div>
          <Link href="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-12">
      <div className="max-w-5xl mx-auto px-4">
        <Link href="/cart" className="text-sm text-[#F4A7B9] hover:underline mb-8 inline-block">
          ← Back to Cart
        </Link>
        <h1 className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT — Form */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-playfair text-xl font-bold text-[#5C3D2E] mb-5">Your Details</h2>
              <div className="space-y-4">
                {[
                  { name: 'name', label: 'Full Name *', placeholder: 'Juan dela Cruz', type: 'text' },
                  { name: 'email', label: 'Email Address *', placeholder: 'juan@email.com', type: 'email' },
                  { name: 'phone', label: 'Phone / WhatsApp *', placeholder: '+63 912 345 6789', type: 'tel' },
                  { name: 'address', label: 'Delivery Address (leave blank if pickup)', placeholder: 'House No., Street, Barangay, City', type: 'text' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-[#5C3D2E] mb-1">{f.label}</label>
                    <input
                      type={f.type} name={f.name} value={(form as any)[f.name]}
                      onChange={handleChange} placeholder={f.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F4A7B9] transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-playfair text-xl font-bold text-[#5C3D2E] mb-5">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'gcash', label: '💙 GCash' },
                  { value: 'maya', label: '💚 Maya' },
                  { value: 'cod', label: '💵 Cash on Delivery' },
                ].map(p => (
                  <button key={p.value}
                    onClick={() => setForm(prev => ({ ...prev, paymentMethod: p.value }))}
                    className={`py-3 px-2 rounded-xl text-sm font-medium border-2 transition-colors ${
                      form.paymentMethod === p.value
                        ? 'border-[#F4A7B9] bg-[#FFF0F5] text-[#5C3D2E]'
                        : 'border-gray-200 text-gray-400 hover:border-[#F4A7B9]'
                    }`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-playfair text-xl font-bold text-[#5C3D2E] mb-3">Special Notes</h2>
              <textarea
                name="notes" value={form.notes} onChange={handleChange} rows={3}
                placeholder="Any special requests? (e.g. message on cake, allergens, delivery time...)"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F4A7B9] transition-colors resize-none"
              />
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div>
            <div className="card p-6 sticky top-24">
              <h2 className="font-playfair text-xl font-bold text-[#5C3D2E] mb-5">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item, i) => {
                  const img = item.product.images?.[0]
                  const src = img
                    ? (typeof img === 'string' ? img : urlFor(img).width(120).height(120).url())
                    : null
                  const price = item.selectedSize?.price ?? item.product.price

                  return (
                    <div key={i} className="flex items-center gap-3">
                      {src ? (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={src} alt={item.product.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-[#FFF0F5] flex items-center justify-center text-2xl flex-shrink-0">🎂</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#5C3D2E] truncate">{item.product.name}</p>
                        {item.selectedSize && <p className="text-xs text-gray-400">{item.selectedSize.size}</p>}
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-[#5C3D2E]">₱{(price * item.quantity).toLocaleString()}</p>
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>₱{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Delivery</span>
                  <span className="text-green-400">To be arranged</span>
                </div>
                <div className="flex justify-between font-bold text-[#5C3D2E] text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₱{total.toLocaleString()}</span>
                </div>
              </div>

              <button onClick={handleSubmit}
                className="w-full bg-[#F4A7B9] text-white py-4 rounded-full font-semibold hover:bg-[#E8849A] transition-colors text-lg">
                Place Order via WhatsApp 📲
              </button>
              <p className="text-xs text-gray-300 text-center mt-3">
                Your order will be sent as a WhatsApp message for us to confirm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}