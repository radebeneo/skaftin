'use client'

import { useState, useCallback, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string
  displayName: string
  email: string
  avatarUrl?: string
  signedInAt: number
}

interface AuthState {
  user: AuthUser | null
  isSignedIn: boolean
}

export interface ProfileData {
  displayName: string
  email: string
  avatarUrl?: string
  preferences: {
    likes: string[]
    dislikes: string[]
    favouriteProducts: string[]
  }
  addresses: SavedAddress[]
}

export interface SavedAddress {
  id: string
  label: string    // e.g. "Home", "Work"
  street: string
  suburb: string
  city: string
  postalCode: string
  isDefault: boolean
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const AUTH_KEY = 'eskort-auth'
const PROFILE_KEY = 'eskort-profile'

function loadAuth(): AuthState {
  try {
    if (typeof window === 'undefined') return { user: null, isSignedIn: false }
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return { user: null, isSignedIn: false }
    const user = JSON.parse(raw) as AuthUser
    return { user, isSignedIn: true }
  } catch {
    return { user: null, isSignedIn: false }
  }
}

function saveAuth(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_KEY)
    }
  } catch {}
}

export function loadProfile(): ProfileData {
  try {
    if (typeof window === 'undefined') return defaultProfile()
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return defaultProfile()
    return JSON.parse(raw) as ProfileData
  } catch {
    return defaultProfile()
  }
}

export function saveProfile(data: ProfileData): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
  } catch {}
}

function defaultProfile(): ProfileData {
  return {
    displayName: '',
    email: '',
    preferences: { likes: [], dislikes: [], favouriteProducts: [] },
    addresses: [],
  }
}

function generateId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Mock auth hook — Clerk-interface-compatible.
 * To upgrade to real Clerk: replace useAuthStore() calls with useUser() from @clerk/nextjs.
 */
export function useAuthStore() {
  const [state, setState] = useState<AuthState>(() => loadAuth())

  useEffect(() => {
    saveAuth(state.user)
  }, [state])

  const signIn = useCallback((email: string, name: string) => {
    const user: AuthUser = {
      id: generateId(),
      displayName: name || email.split('@')[0],
      email,
      signedInAt: Date.now(),
    }
    // Award 50 bonus stars on first sign-in (caller should handle this)
    setState({ user, isSignedIn: true })
    return user
  }, [])

  const signOut = useCallback(() => {
    setState({ user: null, isSignedIn: false })
  }, [])

  const updateUser = useCallback((patch: Partial<AuthUser>) => {
    setState(prev => {
      if (!prev.user) return prev
      const updated = { ...prev.user, ...patch }
      return { user: updated, isSignedIn: true }
    })
  }, [])

  return {
    user: state.user,
    isSignedIn: state.isSignedIn,
    signIn,
    signOut,
    updateUser,
  }
}
