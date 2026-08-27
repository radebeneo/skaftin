'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/lib/auth'
import { useRewardsStore } from '@/lib/rewards-store'
import { useNotificationsStore } from '@/lib/notifications-store'

export default function SignUpPage() {
  const router = useRouter()
  const { signIn, isSignedIn } = useAuthStore()
  const { addStars } = useRewardsStore()
  const { addNotification } = useNotificationsStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isSignedIn) {
    router.replace('/')
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (!email.trim()) { setError('Please enter your email address.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (!agreed) { setError('Please accept the terms and conditions.'); return }

    setLoading(true)
    setTimeout(() => {
      signIn(email, name)
      addStars(50, 'Welcome bonus — new account')
      addNotification('stars', 'Welcome to Eskort! 🎉', `Hi ${name}! You've earned 50 Skaftin Stars as a welcome bonus.`)
      addNotification('system', 'Your account is ready', 'You can now build Skaftin plans and track your rewards.')
      setLoading(false)
      router.replace('/')
    }, 900)
  }

  return (
    <div className="min-h-screen flex bg-background font-sans">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-eskort-red flex-col items-start justify-between p-12 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-red-400 opacity-20 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Eskort" className="h-10 w-auto brightness-0 invert" />
        </div>

        <div className="relative z-10 max-w-sm">
          <h1 className="hero-impact-text text-[5rem] leading-none text-brand-yellow uppercase mb-4">
            JOIN THE<br />FAMILY
          </h1>
          <p className="text-base font-bold text-white/90 leading-relaxed">
            Create your free Eskort account and start building personalised lunchbox plans for your kids. Earn Stars. Unlock rewards.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { emoji: '⭐', title: '50 Stars welcome bonus', sub: 'On your first sign-up' },
              { emoji: '🎒', title: 'Build unlimited Skaftin plans', sub: 'New plan every week' },
              { emoji: '🏆', title: 'Climb the rewards tiers', sub: 'Bronze → Silver → Gold' },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <p className="font-black text-sm text-white">{item.title}</p>
                  <p className="text-xs text-white/60">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Established 1917 · South Africa&apos;s #1 Meat Brand</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        <div className="lg:hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Eskort" className="h-9 w-auto" />
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="font-display font-black text-3xl text-ink uppercase tracking-tight mb-2">Create Account</h2>
            <p className="text-sm text-muted-foreground">Already have an account?{' '}
              <Link href="/sign-in" className="font-bold text-eskort-red hover:underline">Sign in</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="signup-name" className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full h-12 px-4 rounded-xl border-2 border-border focus:border-ink outline-none text-sm font-medium text-ink placeholder:text-neutral-400 transition"
              />
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-xl border-2 border-border focus:border-ink outline-none text-sm font-medium text-ink placeholder:text-neutral-400 transition"
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full h-12 px-4 pr-12 rounded-xl border-2 border-border focus:border-ink outline-none text-sm font-medium text-ink placeholder:text-neutral-400 transition"
                />
                <button
                  type="button"
                  id="signup-toggle-password"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-ink transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="signup-terms"
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-eskort-red shrink-0"
              />
              <label htmlFor="signup-terms" className="text-xs font-medium text-muted-foreground leading-relaxed">
                I agree to Eskort&apos;s{' '}
                <span className="font-bold text-ink hover:text-eskort-red cursor-pointer">Terms of Service</span>{' '}
                and{' '}
                <span className="font-bold text-ink hover:text-eskort-red cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            {error && (
              <div role="alert" className="text-sm font-bold text-eskort-red bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              id="signup-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full h-13 bg-ink hover:bg-eskort-red text-white font-extrabold rounded-full text-sm flex items-center justify-center gap-2 shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>Create Account — Earn 50 Stars</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <Link href="/" className="text-xs font-bold text-muted-foreground hover:text-ink transition">
              ← Back to Eskort homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
