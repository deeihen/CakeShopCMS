import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { SiteSettings } from '@/types'

export const revalidate = 60

export default async function ContactPage() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery)

  const faqs = [
    {
      q: "How far in advance should I order?",
      a: "We recommend ordering at least 5–7 days in advance for custom cakes, and 2–3 days for standard orders.",
    },
    {
      q: "Do you deliver outside Quezon City?",
      a: "Yes! We deliver Metro Manila-wide. Delivery fees vary by distance — just ask us when you inquire.",
    },
    {
      q: "Can I request a specific design?",
      a: "Absolutely. Send us a photo or description and we'll bring your vision to life. We love a challenge!",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept GCash, Maya, BPI, BDO, and cash on delivery (within QC only).",
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FFF0F5] overflow-hidden py-24">
        {/* Decorative blobs */}
        <div className="absolute top-[-100px] right-[-80px] w-[500px] h-[500px] rounded-full bg-[#F4A7B9]/20 pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-60px] w-[380px] h-[380px] rounded-full bg-[#FFD6E0]/30 pointer-events-none" />
        <div className="absolute top-16 left-[15%] w-4 h-4 rounded-full bg-[#F4A7B9]/60" />
        <div className="absolute top-32 right-[20%] w-6 h-6 rounded-full bg-[#F4A7B9]/40" />
        <div className="absolute bottom-16 left-[40%] w-3 h-3 rounded-full bg-[#5C3D2E]/20" />
        <div className="absolute top-20 right-[35%] w-2 h-2 rounded-full bg-[#5C3D2E]/30" />
        {/* Dashed decorative ring */}
        <div className="absolute -top-6 right-[12%] w-24 h-24 rounded-full border-2 border-dashed border-[#F4A7B9]/40" />
        <div className="absolute bottom-12 left-[8%] w-16 h-16 rounded-full border-2 border-dashed border-[#F4A7B9]/30" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">

          <h1 className="font-playfair text-6xl md:text-7xl font-bold text-[#5C3D2E] leading-[1.1] mb-5">
            Let's Create<br />
            <span className="text-[#F4A7B9]">Something</span> Sweet
          </h1>
          <p className="text-[#8D6E63] text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Whether it's a custom cake, a general question, or just a hello — we're here and we can't wait to hear from you.
          </p>

          {/* Quick-action pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`mailto:${settings?.contactEmail || 'hello@cakeshop.ph'}`}
              className="inline-flex items-center gap-2 bg-[#F4A7B9] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-md hover:bg-[#E8849A] transition-all hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Email Us
            </a>
            <a
              href={`tel:${settings?.contactPhone || '+639123456789'}`}
              className="inline-flex items-center gap-2 bg-white border-2 border-[#5C3D2E] text-[#5C3D2E] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#5C3D2E] hover:text-white transition-all hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <div className="bg-[#5C3D2E]">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '< 24hrs', label: 'Response Time' },
            { value: 'Mon – Sat', label: 'Operating Days' },
            { value: '8am – 8pm', label: 'Business Hours' },
            { value: 'Metro MNL', label: 'Delivery Coverage' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-playfair text-2xl font-bold text-[#F4A7B9]">{s.value}</p>
              <p className="text-xs text-white/60 mt-1 tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6">

            {/* Section heading */}
            <div className="mb-2">
              <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-1">Ways to Reach Us</p>
              <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E]">Get in Touch</h2>
            </div>

            {/* Contact cards — now richer */}
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                ),
                label: 'Email Us',
                value: settings?.contactEmail || 'hello@cakeshop.ph',
                sub: 'We reply within 24 hours',
                href: `mailto:${settings?.contactEmail || 'hello@cakeshop.ph'}`,
                bg: 'bg-[#FFF0F5]',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                ),
                label: 'Call / Message Us',
                value: settings?.contactPhone || '+63 912 345 6789',
                sub: 'Mon–Sat, 8am–8pm',
                href: `tel:${settings?.contactPhone || '+639123456789'}`,
                bg: 'bg-[#FFF8F0]',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                ),
                label: 'Our Location',
                value: settings?.address || 'Quezon City, Philippines',
                sub: 'By appointment only',
                href: 'https://maps.google.com/?q=Quezon+City+Philippines',
                bg: 'bg-[#F0F8FF]',
              },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.label === 'Our Location' ? '_blank' : undefined}
                rel={c.label === 'Our Location' ? 'noopener noreferrer' : undefined}
                className="group flex items-start gap-5 bg-white border border-[#F4A7B9]/20 rounded-3xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-0.5">{c.label}</p>
                  <p className="text-[#5C3D2E] font-semibold truncate group-hover:text-[#F4A7B9] transition-colors">{c.value}</p>
                  <p className="text-xs text-[#8D6E63] mt-0.5">{c.sub}</p>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#F4A7B9] text-xs flex-shrink-0 self-center group-hover:bg-[#F4A7B9] group-hover:text-white transition-all">→</span>
              </a>
            ))}

            {/* Social links */}
            {(settings?.facebookUrl || settings?.instagramUrl) && (
              <div className="bg-white border border-[#F4A7B9]/20 rounded-3xl p-5 shadow-sm">
                <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-4">Follow Our Journey</p>
                <div className="flex gap-3">
                  {settings?.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#FFF0F5] hover:bg-[#F4A7B9] text-[#5C3D2E] hover:text-white rounded-2xl px-4 py-3 text-sm font-semibold transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      Facebook
                    </a>
                  )}
                  {settings?.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#FFF0F5] hover:bg-[#F4A7B9] text-[#5C3D2E] hover:text-white rounded-2xl px-4 py-3 text-sm font-semibold transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* FAQ strip */}
            <div className="bg-white border border-[#F4A7B9]/20 rounded-3xl p-6 shadow-sm">
              <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-4">Quick Answers</p>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group cursor-pointer">
                    <summary className="flex items-center justify-between text-sm font-semibold text-[#5C3D2E] list-none select-none">
                      {faq.q}
                      <span className="w-6 h-6 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#F4A7B9] text-xs flex-shrink-0 ml-3 group-open:bg-[#F4A7B9] group-open:text-white transition-all">+</span>
                    </summary>
                    <p className="mt-2 text-sm text-[#8D6E63] leading-relaxed pl-0">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Inquiry Form ── */}
          <div className="relative">
            {/* Decorative accent behind the card */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-[#F4A7B9]/10 pointer-events-none" />
            <div className="absolute -top-2 -right-2 w-full h-full rounded-3xl bg-[#F4A7B9]/15 pointer-events-none" />

            <div className="relative bg-white border border-[#F4A7B9]/20 rounded-3xl shadow-xl overflow-hidden">
              {/* Form header with decorative band */}
              <div className="bg-[#5C3D2E] px-8 pt-8 pb-10 relative overflow-hidden">
                <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full bg-[#F4A7B9]/15" />
                <div className="absolute bottom-[-30px] left-[-20px] w-28 h-28 rounded-full bg-[#F4A7B9]/10" />
                <div className="relative z-10">
                  <span className="inline-block bg-[#F4A7B9]/20 text-[#F9D8E1] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Custom Order</span>
                  <h2 className="font-playfair text-3xl font-bold text-white mb-1">Cake Inquiry Form</h2>
                  <p className="text-white/60 text-sm">Fill this out and we'll get back to you within 24 hours!</p>
                </div>
              </div>

              {/* Wavy separator — pure CSS */}
              <div className="h-6 bg-white relative">
                <svg viewBox="0 0 400 24" className="absolute bottom-0 left-0 w-full" fill="#5C3D2E" preserveAspectRatio="none" style={{ height: '24px' }}>
                  <path d="M0,0 C100,24 300,0 400,24 L400,0 Z" />
                </svg>
              </div>

              <div className="px-8 pt-5 pb-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Your Name', placeholder: 'Juan dela Cruz', type: 'text', col: 'sm:col-span-2' },
                    { label: 'Email Address', placeholder: 'juan@email.com', type: 'email', col: '' },
                    { label: 'Phone Number', placeholder: '+63 912 345 6789', type: 'tel', col: '' },
                  ].map(f => (
                    <div key={f.label} className={f.col}>
                      <label className="block text-xs font-semibold text-[#5C3D2E] mb-1.5 uppercase tracking-wider">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#F4A7B9] focus:ring-2 focus:ring-[#F4A7B9]/20 transition-all bg-[#FFF8F0] placeholder:text-gray-300"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C3D2E] mb-1.5 uppercase tracking-wider">Occasion</label>
                    <select className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#F4A7B9] focus:ring-2 focus:ring-[#F4A7B9]/20 transition-all bg-[#FFF8F0] text-gray-500 appearance-none">
                      <option value="" disabled>Select occasion...</option>
                      <option>Birthday</option>
                      <option>Wedding</option>
                      <option>Anniversary</option>
                      <option>Graduation</option>
                      <option>Baby Shower</option>
                      <option>Just Because ✨</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C3D2E] mb-1.5 uppercase tracking-wider">Cake Size / Servings</label>
                    <input
                      type="text"
                      placeholder="e.g. 6 inches / 10 pax"
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#F4A7B9] focus:ring-2 focus:ring-[#F4A7B9]/20 transition-all bg-[#FFF8F0] placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C3D2E] mb-1.5 uppercase tracking-wider">Event Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#F4A7B9] focus:ring-2 focus:ring-[#F4A7B9]/20 transition-all bg-[#FFF8F0] text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C3D2E] mb-1.5 uppercase tracking-wider">Message / Special Requests</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your dream cake — flavors, design inspiration, dietary needs, anything!"
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#F4A7B9] focus:ring-2 focus:ring-[#F4A7B9]/20 transition-all bg-[#FFF8F0] resize-none placeholder:text-gray-300"
                  />
                </div>

                <a
                  href={`mailto:${settings?.contactEmail || 'hello@cakeshop.ph'}?subject=Custom Cake Inquiry`}
                  className="flex items-center justify-center gap-2 w-full bg-[#F4A7B9] text-white py-4 rounded-full font-bold tracking-wide hover:bg-[#E8849A] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F4A7B9]/30 mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Send Inquiry via Email
                </a>

                <p className="text-xs text-gray-300 text-center pt-1">
                  Or DM us on <span className="text-[#F4A7B9] font-semibold">Facebook</span> or <span className="text-[#F4A7B9] font-semibold">Instagram</span> for a faster response!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#F4A7B9]/8 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#5C3D2E]/5 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-2">Custom Order Process</p>
            <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E]">
              From <span className="text-[#F4A7B9]">Dream</span> to Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Send Your Inquiry', desc: 'Fill out the form or message us directly with your idea.', bg: 'bg-[#FFF0F5]', accent: 'text-[#F4A7B9]', badge: 'bg-[#F9D8E1] text-[#E395AB]' },
              { step: '02', title: 'We Plan Together', desc: 'We discuss flavors, design, size, and budget to bring your vision to life.', bg: 'bg-[#FFF8F0]', accent: 'text-[#E8A87C]', badge: 'bg-[#F8E8D8] text-[#D79A72]' },
              { step: '03', title: 'We Bake with Love', desc: 'Your cake is handcrafted fresh using only the finest local ingredients.', bg: 'bg-[#F0F8FF]', accent: 'text-[#7BAFD4]', badge: 'bg-[#DDEAF8] text-[#6B9BC3]' },
              { step: '04', title: 'Delivered to You', desc: 'Your celebration-ready cake arrives on time, perfectly packaged.', bg: 'bg-[#F0FFF4]', accent: 'text-[#5BAD72]', badge: 'bg-[#D8F8E1] text-[#4E9862]' },
            ].map((item, i, arr) => (
              <div key={item.step} className="relative">
                <div className={`${item.bg} rounded-3xl p-7 hover:shadow-md transition-shadow h-full`}>
                  <div className={`inline-flex h-11 min-w-11 px-3 items-center justify-center rounded-2xl text-xl font-bold mb-4 ${item.badge}`}>
                    {item.step}
                  </div>
                  <h3 className={`font-playfair text-lg font-bold ${item.accent} mb-2`}>{item.title}</h3>
                  <p className="text-[#8D6E63] text-sm leading-relaxed">{item.desc}</p>
                </div>
                {/* Connector arrow between steps */}
                {i < arr.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 w-8 h-8 -translate-y-1/2 items-center justify-center">
                    <span className="text-[#F4A7B9] text-xl font-bold">›</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER BAND ────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-[#FFF0F5] overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-[#F4A7B9]/20" />
        <div className="absolute bottom-[-40px] left-[-40px] w-56 h-56 rounded-full bg-[#FFD6E0]/30" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-4">
            Ready to Order? <span className="text-[#F4A7B9]">We're Ready Too.</span>
          </p>
          <p className="text-[#8D6E63] mb-8 max-w-xl mx-auto">
            Don't wait — your dream cake is just a message away. We'll get back to you faster than you think!
          </p>
          <a
            href={`mailto:${settings?.contactEmail || 'hello@cakeshop.ph'}?subject=Custom Cake Inquiry`}
            className="inline-flex items-center gap-2 bg-[#5C3D2E] text-white px-10 py-4 rounded-full font-bold text-base hover:bg-[#4a3025] transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Start Your Order →
          </a>
        </div>
      </section>

    </div>
  )
}
