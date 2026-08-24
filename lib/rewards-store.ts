'use client'

import { useState, useCallback, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type RewardsTier = 'Bronze' | 'Silver' | 'Gold'

export interface RewardsEvent {
  id: string
  label: string
  stars: number
  timestamp: number
}

interface RewardsState {
  stars: number
  history: RewardsEvent[]
}

// ─── Tier logic ───────────────────────────────────────────────────────────────

export function getTier(stars: number): RewardsTier {
  if (stars >= 500) return 'Gold'
  if (stars >= 200) return 'Silver'
  return 'Bronze'
}

export function getNextTierThreshold(stars: number): { next: RewardsTier; threshold: number } | null {
  if (stars < 200) return { next: 'Silver', threshold: 200 }
  if (stars < 500) return { next: 'Gold', threshold: 500 }
  return null // already Gold
}

export const TIER_EMOJI: Record<RewardsTier, string> = {
  Bronze: '⭐',
  Silver: '🌟',
  Gold: '🏆',
}

export const TIER_COLOUR: Record<RewardsTier, string> = {
  Bronze: '#cd7f32',
  Silver: '#94a3b8',
  Gold: '#f59e0b',
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'eskort-rewards'
const MAX_HISTORY = 20

function loadRewards(): RewardsState {
  try {
    if (typeof window === 'undefined') return { stars: 0, history: [] }
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { stars: 0, history: [] }
    const parsed = JSON.parse(raw)
    if (typeof parsed.stars === 'number') return parsed as RewardsState
    return { stars: 0, history: [] }
  } catch {
    return { stars: 0, history: [] }
  }
}

function saveRewards(state: RewardsState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function generateId(): string {
  return `reward-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRewardsStore() {
  const [state, setState] = useState<RewardsState>(() => loadRewards())

  useEffect(() => {
    saveRewards(state)
  }, [state])

  const addStars = useCallback((amount: number, label: string) => {
    setState(prev => {
      const event: RewardsEvent = {
        id: generateId(),
        label,
        stars: amount,
        timestamp: Date.now(),
      }
      return {
        stars: prev.stars + amount,
        history: [event, ...prev.history].slice(0, MAX_HISTORY),
      }
    })
  }, [])

  const resetStars = useCallback(() => {
    setState({ stars: 0, history: [] })
  }, [])

  const tier = getTier(state.stars)
  const nextTier = getNextTierThreshold(state.stars)

  return {
    stars: state.stars,
    tier,
    nextTier,
    history: state.history,
    addStars,
    resetStars,
  }
}
