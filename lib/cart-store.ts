'use client'

import { useState, useCallback, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string
  name: string
  price: number       // numeric, in Rands
  priceLabel: string  // display string e.g. "R 69.99"
  quantity: number
  image?: string
  category?: string
  weight?: string
}

interface CartState {
  items: CartItem[]
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'eskort-cart'

function loadCart(): CartState {
  try {
    if (typeof window === 'undefined') return { items: [] }
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed.items)) return parsed as CartState
    return { items: [] }
  } catch {
    return { items: [] }
  }
}

function saveCart(state: CartState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage unavailable (private browsing, quota exceeded)
  }
}

// ─── Price parser ─────────────────────────────────────────────────────────────

function parsePrice(priceLabel: string): number {
  // Handles "R 69.99", "R69.99", "69.99"
  const match = priceLabel.replace(/[^0-9.]/g, '')
  return parseFloat(match) || 0
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCartStore() {
  const [state, setState] = useState<CartState>(() => loadCart())

  // Sync to storage on every change
  useEffect(() => {
    saveCart(state)
  }, [state])

  const addItem = useCallback((product: { id: string; name: string; priceLabel?: string; price?: number; image?: string; category?: string; weight?: string }) => {
    setState(prev => {
      const existing = prev.items.find(i => i.id === product.id)
      const priceNum = product.price ?? parsePrice(product.priceLabel ?? '')
      const priceLbl = product.priceLabel ?? `R ${priceNum.toFixed(2)}`

      if (existing) {
        return {
          items: prev.items.map(i =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
      }
      return {
        items: [...prev.items, {
          id: product.id,
          name: product.name,
          price: priceNum,
          priceLabel: priceLbl,
          quantity: 1,
          image: product.image,
          category: product.category,
          weight: product.weight,
        }]
      }
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setState(prev => ({ items: prev.items.filter(i => i.id !== id) }))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setState(prev => ({ items: prev.items.filter(i => i.id !== id) }))
      return
    }
    setState(prev => ({
      items: prev.items.map(i => i.id === id ? { ...i, quantity } : i)
    }))
  }, [])

  const clearCart = useCallback(() => {
    setState({ items: [] })
  }, [])

  const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return {
    items: state.items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
}
