import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { SiteSettings } from '@/types'
import Link from 'next/link'

export const revalidate = 60

export default async function ContactPage() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery)

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Hero Banner */}
      <div className="bg-[#FFF0F5] py-16 text-center">
        <p className="section-label mb-2">We'd Love to Hear From You</p>
        <h1 className="font-playfair text-5xl font-bold text-[#5C3D2E]">Contact Us</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Contact Info */}
        <div>
          <h2 className="font-playfair text-3xl font-bold text-[#5C3D2E] mb-8">Get in Touch</h2>

          <div className="space-y-6">
            {[
              {
                emoji: '📧', label: 'Email Us',
                value: settings?.contactEmail || 'hello@cakeshop.ph',
                href: `mailto:${settings?.contactEmail || 'hello@cakeshop.ph'}`
              },
              {
                emoji: '📞', label: 'Call / Message Us',
                value: settings?.contactPhone || '+63 912 345 6789',
                href: `tel:${settings?.contactPhone || '+639123456789'}`
              },
              {
                emoji: '📍', label: 'Our Location',
                value: settings?.address || 'Quezon City, Philippines',
                href: null
              },
            ].map(item => (
              <div key={item.label} className="card p-5 flex items-start gap-4">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-medium mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-[#5C3D2E] font-semibold hover:text-[#F4A7B9] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[#5C3D2E] font-semibold">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          {(settings?.facebookUrl || settings?.instagramUrl) && (
            <div className="mt-8">
              <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-medium mb-4">Follow Us</p>
              <div className="flex gap-4">
                {settings.facebookUrl && (
                  <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer"
                    className="card px-5 py-3 text-sm font-medium text-[#5C3D2E] hover:text-[#F4A7B9] transition-colors">
                    📘 Facebook
                  </a>
                )}
                {settings.instagramUrl && (
                  <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer"
                    className="card px-5 py-3 text-sm font-medium text-[#5C3D2E] hover:text-[#F4A7B9] transition-colors">
                    📸 Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Custom Order Form */}
        <div className="card p-8">
          <h2 className="font-playfair text-2xl font-bold text-[#5C3D2E] mb-2">Custom Cake Inquiry</h2>
          <p className="text-gray-400 text-sm mb-6">Fill this out and we'll get back to you within 24 hours!</p>

          <ContactForm contactEmail={settings?.contactEmail} />
        </div>
      </div>
    </div>
  )
}

// Client component for the form
function ContactForm({ contactEmail }: { contactEmail?: string }) {
  const mailto = `mailto:${contactEmail || 'hello@cakeshop.ph'}?subject=Custom Cake Inquiry`

  return (
    <div className="space-y-4">
      {[
        { label: 'Your Name', placeholder: 'Juan dela Cruz', type: 'text' },
        { label: 'Email Address', placeholder: 'juan@email.com', type: 'email' },
        { label: 'Phone Number', placeholder: '+63 912 345 6789', type: 'tel' },
        { label: 'Occasion', placeholder: 'Birthday, Wedding, Anniversary...', type: 'text' },
        { label: 'Cake Size / Servings', placeholder: 'e.g. 6 inches / 10 pax', type: 'text' },
      ].map(f => (
        <div key={f.label}>
          <label className="block text-sm font-medium text-[#5C3D2E] mb-1">{f.label}</label>
          <input type={f.type} placeholder={f.placeholder}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F4A7B9] transition-colors" />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Message / Special Requests</label>
        <textarea rows={4} placeholder="Tell us about your dream cake..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F4A7B9] transition-colors resize-none" />
      </div>

      <a href={mailto}
        className="block w-full bg-[#F4A7B9] text-white py-3 rounded-full text-center font-semibold hover:bg-[#E8849A] transition-colors mt-2">
        Send Inquiry via Email →
      </a>
      <p className="text-xs text-gray-300 text-center">
        Or message us directly on Facebook / Instagram!
      </p>
    </div>
  )
}