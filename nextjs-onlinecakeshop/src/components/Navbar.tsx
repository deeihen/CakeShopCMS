'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { ShoppingBag, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { itemCount } = useCart()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/cakes', label: 'Our Cakes' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold text-[#5C3D2E]">
          The Glaze Gallery
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative font-medium transition-colors pb-1 ${
                isActive(l.href)
                  ? 'text-[#F4A7B9]'
                  : 'text-[#5C3D2E] hover:text-[#F4A7B9]'
              }`}
            >
              {l.label}
              {/* Active underline indicator */}
              {isActive(l.href) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F4A7B9] rounded-full" />
              )}
            </Link>
          ))}
          <Link href="/cart" className="relative">
            <ShoppingBag className="text-[#5C3D2E] hover:text-[#F4A7B9] transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F4A7B9] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingBag className="text-[#5C3D2E]" size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F4A7B9] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="text-[#5C3D2E]" /> : <Menu className="text-[#5C3D2E]" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-medium py-1 transition-colors border-l-2 pl-3 ${
                isActive(l.href)
                  ? 'text-[#F4A7B9] border-[#F4A7B9]'
                  : 'text-[#5C3D2E] border-transparent hover:text-[#F4A7B9] hover:border-[#F4A7B9]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}