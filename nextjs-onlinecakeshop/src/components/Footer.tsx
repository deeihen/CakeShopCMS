import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#5C3D2E] text-white py-14 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <h3 className="font-playfair text-2xl font-bold mb-3">🎂 CakeShop</h3>
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
        <div>
          <h4 className="font-semibold mb-4">Get in Touch</h4>
          <div className="space-y-2 text-sm text-white/60">
            <p>📧 hello@cakeshop.ph</p>
            <p>📞 +63 912 345 6789</p>
            <p>📍 Quezon City, Philippines</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 pt-6 text-center text-sm text-white/40">
        © {new Date().getFullYear()} OnlineCakeShop. All rights reserved.
      </div>
    </footer>
  )
}