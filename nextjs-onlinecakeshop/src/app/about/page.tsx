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
      {/* Hero Banner */}
      <div className="bg-[#FFF0F5] py-16 text-center">
        <p className="section-label mb-2">Our Story</p>
        <h1 className="font-playfair text-5xl font-bold text-[#5C3D2E]">About Us</h1>
      </div>

      {/* Story Section */}
      <section className="max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative h-80 md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
          {settings?.heroImage ? (
            <Image
              src={urlFor(settings.heroImage).width(600).height(600).url()}
              alt="About us" fill className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F4A7B9] to-[#FFD6E0] flex items-center justify-center text-8xl">
              🎂
            </div>
          )}
        </div>

        <div>
          <p className="section-label mb-3">Who We Are</p>
          <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-6 leading-tight">
            Made with Love, <br />Baked with Passion
          </h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            {settings?.aboutText ||
              'We are a home-based cake shop dedicated to crafting beautiful, delicious cakes for every occasion. Every cake is made fresh with the finest ingredients, baked with love and attention to detail.'}
          </p>
          <p className="text-gray-500 leading-relaxed mb-8">
            Whether it's a birthday, wedding, anniversary, or just because — we believe every celebration deserves a cake as special as the moment itself.
          </p>
          <Link href="/cakes" className="btn-primary">Browse Our Cakes</Link>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center mb-12">
          <p className="section-label mb-2">What We Stand For</p>
          <h2 className="section-title">Our Values</h2>
        </div>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { emoji: '🌸', title: 'Made Fresh', desc: 'Every cake is baked to order — never frozen, always fresh.' },
            { emoji: '💝', title: 'Made with Love', desc: 'We pour care and creativity into every single design.' },
            { emoji: '✨', title: 'Quality First', desc: 'Only the finest ingredients make it into our cakes.' },
          ].map(v => (
            <div key={v.title} className="card p-8 text-center">
              <div className="text-5xl mb-4">{v.emoji}</div>
              <h3 className="font-playfair text-xl font-semibold text-[#5C3D2E] mb-2">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="font-playfair text-4xl font-bold text-[#5C3D2E] mb-4">Have a Special Order?</h2>
        <p className="text-gray-400 mb-8">We love creating custom cakes tailored just for you.</p>
        <Link href="/contact" className="btn-primary">Contact Us</Link>
      </section>
    </div>
  )
}