'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, CheckCircle2, ShoppingCart, Star, Package, Megaphone } from 'lucide-react'
import { useNotificationsStore, type AppNotification } from '@/lib/notifications-store'

interface ToastItem {
  notification: AppNotification
  visible: boolean
}

function ToastIcon({ type }: { type: AppNotification['type'] }) {
  switch (type) {
    case 'cart':   return <ShoppingCart className="h-4 w-4" />
    case 'stars':  return <Star className="h-4 w-4" />
    case 'order':  return <Package className="h-4 w-4" />
    case 'promo':  return <Megaphone className="h-4 w-4" />
    default:       return <CheckCircle2 className="h-4 w-4" />
  }
}

const ICON_BG: Record<AppNotification['type'], string> = {
  cart:   'bg-blue-500 text-white',
  stars:  'bg-amber-500 text-white',
  order:  'bg-green-500 text-white',
  promo:  'bg-eskort-red text-white',
  system: 'bg-neutral-600 text-white',
}

const TOAST_DURATION = 3500
const MAX_VISIBLE = 3

export function ToastQueue() {
  const { notifications } = useNotificationsStore()
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const seenIds = useRef<Set<string>>(new Set())

  // Detect new notifications and queue them as toasts
  useEffect(() => {
    const latest = notifications[0]
    if (!latest) return
    if (seenIds.current.has(latest.id)) return
    seenIds.current.add(latest.id)

    const item: ToastItem = { notification: latest, visible: true }
    setToasts(prev => [item, ...prev].slice(0, MAX_VISIBLE))

    // Auto-dismiss
    setTimeout(() => {
      setToasts(prev => prev.map(t =>
        t.notification.id === latest.id ? { ...t, visible: false } : t
      ))
      // Remove from DOM after transition
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.notification.id !== latest.id))
      }, 350)
    }, TOAST_DURATION)
  }, [notifications])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.map(t =>
      t.notification.id === id ? { ...t, visible: false } : t
    ))
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.notification.id !== id))
    }, 350)
  }, [])

  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none"
    >
      {toasts.map(({ notification, visible }) => (
        <div
          key={notification.id}
          role="status"
          className={`pointer-events-auto flex items-start gap-3 bg-ink text-white px-5 py-4 rounded-2xl shadow-2xl border border-neutral-800 w-[320px] sm:w-[360px] transform transition-all duration-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Icon */}
          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${ICON_BG[notification.type]}`}>
            <ToastIcon type={notification.type} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-snug">{notification.title}</p>
            <p className="text-xs text-neutral-400 leading-relaxed mt-0.5 line-clamp-2">{notification.body}</p>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => dismiss(notification.id)}
            aria-label="Dismiss notification"
            className="shrink-0 p-1 rounded-lg hover:bg-neutral-800 transition mt-0.5"
          >
            <X className="h-3.5 w-3.5 text-neutral-400" />
          </button>
        </div>
      ))}
    </div>
  )
}
