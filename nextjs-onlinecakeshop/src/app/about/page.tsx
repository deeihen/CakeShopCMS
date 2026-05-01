import { client, urlFor } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { SiteSettings } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export default async function AboutPage() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery)

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FFF0F5] overflow-hidden py-24">
        <div className="absolute top-[-80px] right-[-80px] w-[440px] h-[440px] rounded-full bg-[#F4A7B9]/20 pointer-events-none" />
        <div className="absolute bottom-[-70px] left-[-60px] w-[360px] h-[360px] rounded-full bg-[#FFD6E0]/30 pointer-events-none" />
        <div className="absolute top-14 left-[10%] w-4 h-4 rounded-full bg-[#F4A7B9]/60" />
        <div className="absolute top-24 right-[15%] w-6 h-6 rounded-full bg-[#F4A7B9]/40" />
        <div className="absolute bottom-10 left-[42%] w-3 h-3 rounded-full bg-[#5C3D2E]/20" />
        <div className="absolute -top-6 right-[10%] w-24 h-24 rounded-full border-2 border-dashed border-[#F4A7B9]/40" />
        <div className="absolute bottom-8 left-[5%] w-14 h-14 rounded-full border-2 border-dashed border-[#F4A7B9]/30" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h1 className="font-playfair text-6xl md:text-7xl font-bold text-[#5C3D2E] leading-[1.1] mb-5">
            About <span className="text-[#F4A7B9]">Us</span>
          </h1>
          <p className="text-[#8D6E63] text-lg max-w-xl mx-auto">
            A home-based cake shop born from a love of baking and a passion for making celebrations sweeter.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <div className="bg-[#5C3D2E]">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: 'Cakes Delivered' },
            { value: '4.9', label: 'Average Rating' },
            { value: '100%', label: 'Fresh Baked' },
            { value: '3+ yrs', label: 'Baking Since' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-playfair text-2xl font-bold text-[#F4A7B9]">{s.value}</p>
              <p className="text-xs text-white/60 mt-1 tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── STORY SECTION ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image with layered decoration */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-[#F4A7B9]/10 pointer-events-none" />
          <div className="absolute -top-2 -left-2 w-full h-full rounded-3xl bg-[#F4A7B9]/15 pointer-events-none" />
          <div className="relative h-[420px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {settings?.heroImage ? (
              <Image
                src={urlFor(settings.heroImage).width(700).height(700).url()}
                alt="About us"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#F9D8E1] to-[#FFD6E0] flex items-center justify-center">
                <div className="w-28 h-28 rounded-3xl bg-white/35 border border-white/50" />
              </div>
            )}
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-xs text-[#8D6E63] font-medium">Est.</p>
              <p className="font-playfair text-xl font-bold text-[#5C3D2E]">With ♥</p>
            </div>
          </div>
          {/* Decorative dashed ring */}
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border-2 border-dashed border-[#F4A7B9]/40" />
        </div>

        {/* Text content */}
        <div>
          <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-3">Who We Are</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#5C3D2E] leading-tight mb-6">
            Made with Love,<br />
            <span className="text-[#F4A7B9]">Baked with Passion</span>
          </h2>
          <p className="text-[#8D6E63] leading-relaxed mb-5 text-base">
            {settings?.aboutText ||
              "Founded on a passion for baking, we specialize in creating bespoke cakes that celebrate life's most precious moments. From weddings to birthdays, our mission is to provide more than just dessert — we provide memories."}
          </p>
          <p className="text-[#8D6E63] leading-relaxed mb-10 text-base">
            Whether it's a birthday, wedding, anniversary, or just because — we believe every celebration deserves a cake as special as the moment itself.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/cakes"
              className="inline-flex items-center gap-2 bg-[#F4A7B9] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#E8849A] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F4A7B9]/30"
            >
              Browse Our Cakes →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-[#5C3D2E] text-[#5C3D2E] px-8 py-4 rounded-full font-semibold hover:bg-[#5C3D2E] hover:text-white transition-all hover:-translate-y-0.5"
            >
              Order Custom Cake
            </Link>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#F4A7B9]/8 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#5C3D2E]/5 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs text-[#F4A7B9] uppercase tracking-widest font-semibold mb-2">What We Stand For</p>
            <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E]">
              Our <span className="text-[#F4A7B9]">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: '01',
                title: 'Made Fresh',
                desc: "Every cake is baked to order — never frozen, always fresh and made on the day it's needed.",
                bg: 'bg-[#FFF0F5]',
                accent: 'text-[#F4A7B9]',
                badge: 'bg-[#F9D8E1] text-[#E395AB]',
              },
              {
                icon: '02',
                title: 'Made with Love',
                desc: 'We pour care and creativity into every single design, treating each cake like it was for our own family.',
                bg: 'bg-[#FFF8F0]',
                accent: 'text-[#E8A87C]',
                badge: 'bg-[#F8E8D8] text-[#D79A72]',
              },
              {
                icon: '03',
                title: 'Quality First',
                desc: 'Only the finest locally sourced ingredients make it into our cakes. No shortcuts, ever.',
                bg: 'bg-[#F0F8FF]',
                accent: 'text-[#7BAFD4]',
                badge: 'bg-[#DDEAF8] text-[#6B9BC3]',
              },
            ].map(v => (
              <div key={v.title} className={`${v.bg} rounded-3xl p-8 hover:shadow-md transition-shadow`}>
                <div className={`inline-flex h-12 min-w-12 px-3 items-center justify-center rounded-2xl text-2xl font-bold mb-5 ${v.badge}`}>
                  {v.icon}
                </div>
                <h3 className={`font-playfair text-xl font-bold ${v.accent} mb-3`}>{v.title}</h3>
                <p className="text-[#8D6E63] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMISE STRIP ────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#FFF0F5]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: 'Custom Designs',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 5-5 11-5 11S7 12 7 7a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="2"/><path d="M5 21h14"/><path d="M8 17l-2 4"/><path d="M16 17l2 4"/></svg>,
              },
              {
                label: 'Metro MNL Delivery',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
              },
              {
                label: 'Careful Packaging',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
              },
              {
                label: 'Personal Touch',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4A7B9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
              },
            ].map(p => (
              <div key={p.label} className="text-center bg-white rounded-2xl py-6 px-4 shadow-sm border border-[#F4A7B9]/15 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] flex items-center justify-center mx-auto mb-3">{p.icon}</div>
                <p className="text-sm font-semibold text-[#5C3D2E]">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-24 bg-[#5C3D2E] overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-[#F4A7B9]/15" />
        <div className="absolute bottom-[-40px] left-[-40px] w-56 h-56 rounded-full bg-[#F4A7B9]/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-[#F4A7B9]/20 text-[#F9D8E1] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Special Orders
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Have a Special Order?<br />
            <span className="text-[#F4A7B9]">We'd Love to Help.</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            We create custom cakes tailored just for you — from concept to celebration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#F4A7B9] text-white px-10 py-4 rounded-full font-bold hover:bg-[#e8829a] transition-all shadow-lg hover:-translate-y-0.5"
            >
              Contact Us →
            </Link>
            <Link
              href="/cakes"
              className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}