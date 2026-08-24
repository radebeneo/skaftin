'use client'

import { useState, useCallback, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType = 'cart' | 'stars' | 'order' | 'promo' | 'system'

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  body: string
  read: boolean
  timestamp: number // Unix ms
}

interface NotificationsState {
  notifications: AppNotification[]
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'eskort-notifications'
const MAX_STORED = 50

function loadNotifications(): NotificationsState {
  try {
    if (typeof window === 'undefined') return { notifications: [] }
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { notifications: [] }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed.notifications)) return parsed as NotificationsState
    return { notifications: [] }
  } catch {
    return { notifications: [] }
  }
}

function saveNotifications(state: NotificationsState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function generateId(): string {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useNotificationsStore() {
  const [state, setState] = useState<NotificationsState>(() => loadNotifications())

  useEffect(() => {
    saveNotifications(state)
  }, [state])

  const addNotification = useCallback((
    type: NotificationType,
    title: string,
    body: string
  ) => {
    setState(prev => {
      const newNotif: AppNotification = {
        id: generateId(),
        type,
        title,
        body,
        read: false,
        timestamp: Date.now(),
      }
      const updated = [newNotif, ...prev.notifications].slice(0, MAX_STORED)
      return { notifications: updated }
    })
  }, [])

  const markRead = useCallback((id: string) => {
    setState(prev => ({
      notifications: prev.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    }))
  }, [])

  const markAllRead = useCallback(() => {
    setState(prev => ({
      notifications: prev.notifications.map(n => ({ ...n, read: true }))
    }))
  }, [])

  const clearAll = useCallback(() => {
    setState({ notifications: [] })
  }, [])

  const unreadCount = state.notifications.filter(n => !n.read).length

  return {
    notifications: state.notifications,
    unreadCount,
    addNotification,
    markRead,
    markAllRead,
    clearAll,
  }
}
