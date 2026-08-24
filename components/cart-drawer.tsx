'use client'

import { useEffect, useRef } from 'react'
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, total, itemCount, removeItem, updateQuantity, clearCart } = useCartStore()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Trap scroll on body when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const deliveryFee = total > 350 ? 0 : 49.99
  const orderTotal = total + deliveryFee

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[420px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-ink" />
            <h2 className="font-display font-black text-xl text-ink uppercase tracking-tight">
              My Cart
            </h2>
            {itemCount > 0 && (
              <span className="bg-eskort-red text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            id="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded-xl hover:bg-neutral-100 transition"
          >
            <X className="h-5 w-5 text-ink" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center">
              <ShoppingCart className="h-9 w-9 text-neutral-400" />
            </div>
            <div>
              <p className="font-bold text-lg text-ink mb-1">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some Eskort favourites to get started.</p>
            </div>
            <button
              id="cart-start-shopping"
              onClick={onClose}
              className="bg-ink text-white font-extrabold px-6 py-3 rounded-full text-sm hover:bg-eskort-red transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 bg-neutral-50 rounded-[20px] border border-neutral-100"
                >
                  {/* Image / placeholder */}
                  <div className="w-16 h-16 shrink-0 rounded-xl bg-white border border-neutral-200 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                    ) : (
                      <ShoppingCart className="h-6 w-6 text-neutral-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {item.category && (
                      <p className="text-[10px] font-bold text-eskort-red uppercase tracking-wider mb-0.5">{item.category}</p>
                    )}
                    <p className="font-bold text-sm text-ink leading-snug truncate">{item.name}</p>
                    {item.weight && (
                      <p className="text-xs text-muted-foreground">{item.weight}</p>
                    )}
                    <p className="font-black text-sm text-ink mt-1">
                      R {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      id={`cart-remove-${item.id}`}
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1.5 rounded-lg hover:bg-red-50 hover:text-eskort-red transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-1 py-1">
                      <button
                        id={`cart-dec-${item.id}`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-black text-sm w-5 text-center">{item.quantity}</span>
                      <button
                        id={`cart-inc-${item.id}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer summary */}
            <div className="border-t border-border px-6 py-5 space-y-4 bg-white">
              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-bold text-ink">R {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className={`font-bold ${deliveryFee === 0 ? 'text-brand-green' : 'text-ink'}`}>
                    {deliveryFee === 0 ? 'FREE' : `R ${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[10px] text-muted-foreground">
                    Add R {(350 - total).toFixed(2)} more for free delivery
                  </p>
                )}
                <div className="flex justify-between font-black text-base text-ink pt-1 border-t border-neutral-100">
                  <span>Total</span>
                  <span>R {orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* CTA buttons */}
              <Link
                href="/skaftin"
                id="cart-checkout-btn"
                onClick={onClose}
                className="w-full bg-ink hover:bg-eskort-red text-white font-extrabold py-4 rounded-full text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                Proceed to Checkout
              </Link>
              <button
                id="cart-clear-btn"
                onClick={() => { clearCart(); onClose() }}
                className="w-full border border-neutral-200 text-muted-foreground hover:text-eskort-red hover:border-eskort-red font-bold py-2.5 rounded-full text-xs transition"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
