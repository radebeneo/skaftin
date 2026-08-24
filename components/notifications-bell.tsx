'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, X, ShoppingCart, Star, Package, Megaphone, Settings, CheckCheck } from 'lucide-react'
import { useNotificationsStore, type NotificationType } from '@/lib/notifications-store'

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function NotifIcon({ type }: { type: NotificationType }) {
  const cls = 'h-4 w-4'
  switch (type) {
    case 'cart':    return <ShoppingCart className={cls} />
    case 'stars':   return <Star className={cls} />
    case 'order':   return <Package className={cls} />
    case 'promo':   return <Megaphone className={cls} />
    case 'system':  return <Settings className={cls} />
  }
}

const TYPE_BG: Record<NotificationType, string> = {
  cart:   'bg-blue-100 text-blue-700',
  stars:  'bg-amber-100 text-amber-700',
  order:  'bg-green-100 text-green-700',
  promo:  'bg-red-100 text-eskort-red',
  system: 'bg-neutral-100 text-neutral-600',
}

export function NotificationsBell() {
  const { notifications, unreadCount, markRead, markAllRead, clearAll } = useNotificationsStore()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        id="notifications-bell-btn"
        onClick={() => setOpen(prev => !prev)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        className="relative p-2.5 rounded-full hover:bg-neutral-100 transition"
      >
        <Bell className="h-5 w-5 text-ink" />
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-eskort-red text-white text-[10px] font-black rounded-full px-1"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          id="notifications-panel"
          className="absolute right-0 top-[calc(100%+8px)] w-[360px] bg-white rounded-[24px] border border-border shadow-2xl z-50 overflow-hidden animate-[fadeIn_0.15s_ease]"
          style={{ maxHeight: '480px' }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-ink" />
              <h3 className="font-bold text-sm text-ink">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-eskort-red text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  id="notifications-mark-all-read"
                  onClick={markAllRead}
                  aria-label="Mark all notifications as read"
                  className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-ink transition"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
              <button
                id="notifications-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close notifications"
                className="p-1 rounded-lg hover:bg-neutral-100 transition"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Notification list */}
          <div className="overflow-y-auto" style={{ maxHeight: '360px' }}>
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
                <Bell className="h-8 w-8 text-neutral-300" />
                <p className="text-sm font-bold text-neutral-400">No notifications yet</p>
                <p className="text-xs text-neutral-400">We&apos;ll let you know when something happens.</p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {notifications.map(notif => (
                  <li
                    key={notif.id}
                    className={`px-5 py-4 flex gap-3 cursor-pointer hover:bg-neutral-50 transition ${!notif.read ? 'bg-amber-50/40' : ''}`}
                    onClick={() => markRead(notif.id)}
                  >
                    {/* Icon */}
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${TYPE_BG[notif.type]}`}>
                      <NotifIcon type={notif.type} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug ${notif.read ? 'font-medium text-neutral-700' : 'font-bold text-ink'}`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        {notif.body}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-1">{timeAgo(notif.timestamp)}</p>
                    </div>

                    {/* Unread dot */}
                    {!notif.read && (
                      <span aria-hidden="true" className="shrink-0 mt-2 w-2 h-2 rounded-full bg-eskort-red" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-5 py-3 border-t border-border">
              <button
                id="notifications-clear-all"
                onClick={() => { clearAll(); setOpen(false) }}
                className="text-[11px] font-bold text-muted-foreground hover:text-eskort-red transition"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
