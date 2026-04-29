'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Product, ProductSize } from '@/types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity: number, size?: ProductSize) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cakeshop-cart')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('cakeshop-cart', JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity: number, size?: ProductSize) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.product._id === product._id && i.selectedSize?.size === size?.size
      )
      if (existing) {
        return prev.map(i =>
          i.product._id === product._id && i.selectedSize?.size === size?.size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { product, quantity, selectedSize: size }]
    })
  }

  const removeItem = (productId: string) =>
    setItems(prev => prev.filter(i => i.product._id !== productId))

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) { removeItem(productId); return }
    setItems(prev => prev.map(i => i.product._id === productId ? { ...i, quantity } : i))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, item) => {
    const price = item.selectedSize?.price ?? item.product.price
    return sum + price * item.quantity
  }, 0)

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}