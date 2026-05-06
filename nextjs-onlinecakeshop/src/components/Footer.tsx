import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#5C3D2E] text-white py-14 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <h3 className="font-playfair text-2xl font-bold mb-3">The Glaze Gallery</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Handcrafted cakes made with love for every special occasion.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm text-white/60">
            {[['/', 'Home'], ['/cakes', 'Our Cakes'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
              <Link key={href} href={href} className="block hover:text-white transition-colors">{label}</Link>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} The Glaze Gallery. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4A7B9]/60 inline-block" />
            <span className="text-xs text-white/30">Made in Quezon City</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
