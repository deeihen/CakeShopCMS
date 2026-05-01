import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#3D2418] text-white relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] right-[-60px] w-72 h-72 rounded-full bg-[#F4A7B9]/8 pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[-40px] w-52 h-52 rounded-full bg-[#F4A7B9]/6 pointer-events-none" />
      <div className="absolute top-10 left-[40%] w-3 h-3 rounded-full bg-[#F4A7B9]/30" />
      <div className="absolute bottom-16 right-[25%] w-2 h-2 rounded-full bg-[#F4A7B9]/20" />

      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#F4A7B9] to-transparent opacity-40" />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1.4fr] gap-12 mb-14">

          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <span className="font-playfair text-2xl font-bold text-white tracking-tight">
                CS3A <span className="text-[#F4A7B9]">CakeShop</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Handcrafted cakes made with love for every special occasion — from birthdays to weddings, baked fresh just for you.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#F4A7B9] hover:border-[#F4A7B9]/40 hover:bg-[#F4A7B9]/10 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#F4A7B9] hover:border-[#F4A7B9]/40 hover:bg-[#F4A7B9]/10 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#F4A7B9] hover:border-[#F4A7B9]/40 hover:bg-[#F4A7B9]/10 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#F4A7B9] mb-5">Navigate</h4>
            <div className="space-y-3">
              {[['/', 'Home'], ['/cakes', 'Our Cakes'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#F4A7B9]/40 group-hover:bg-[#F4A7B9] transition-colors flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#F4A7B9] mb-5">Specialties</h4>
            <div className="space-y-3">
              {['Birthday Cakes', 'Wedding Cakes', 'Custom Orders', 'Anniversary Cakes', 'Baby Shower'].map(item => (
                <Link
                  key={item}
                  href="/cakes"
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#F4A7B9]/40 group-hover:bg-[#F4A7B9] transition-colors flex-shrink-0" />
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#F4A7B9] mb-5">Get in Touch</h4>
            <div className="space-y-4">
              {[
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
                  text: 'hello@cakeshop.ph',
                  href: 'mailto:hello@cakeshop.ph',
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                  text: '+63 912 345 6789',
                  href: 'tel:+639123456789',
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
                  text: 'Quezon City, Philippines',
                  href: 'https://maps.google.com/?q=Quezon+City+Philippines',
                },
              ].map(c => (
                <a
                  key={c.text}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#F4A7B9]/40 group-hover:text-[#F4A7B9] transition-all mt-0.5">
                    {c.icon}
                  </span>
                  {c.text}
                </a>
              ))}
            </div>

            {/* CTA button */}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-[#F4A7B9] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#E8849A] transition-all hover:-translate-y-0.5 shadow-md"
            >
              Order a Custom Cake →
            </Link>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} CS3A CakeShop. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4A7B9]/60 inline-block" />
            <span className="text-xs text-white/30">Made with love in Quezon City</span>
          </div>
        </div>
      </div>
    </footer>
  )
}