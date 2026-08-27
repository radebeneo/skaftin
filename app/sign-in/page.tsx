'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/lib/auth'
import { useRewardsStore } from '@/lib/rewards-store'
import { useNotificationsStore } from '@/lib/notifications-store'

export default function SignInPage() {
  const router = useRouter()
  const { signIn, isSignedIn } = useAuthStore()
  const { addStars } = useRewardsStore()
  const { addNotification } = useNotificationsStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isSignedIn) {
    router.replace('/')
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.trim()) { setError('Please enter your email address.'); return }
    if (password.length < 4) { setError('Password must be at least 4 characters.'); return }

    setLoading(true)
    // Simulate async auth
    setTimeout(() => {
      signIn(email, email.split('@')[0])
      addStars(50, 'Welcome bonus — first sign-in')
      addNotification('stars', 'Welcome back! 🎉', "You've earned 50 Skaftin Stars for signing in.")
      setLoading(false)
      router.replace('/')
    }, 800)
  }

  return (
    <div className="min-h-screen flex bg-background font-sans">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-yellow flex-col items-start justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FFAD00]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300 opacity-30 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Eskort" className="h-10 w-auto" />
        </div>

        <div className="relative z-10 max-w-sm">
          <h1 className="hero-impact-text text-[5rem] leading-none text-[#D0302F] uppercase mb-4">
            WELCOME<br />BACK
          </h1>
          <p className="text-base font-bold text-ink leading-relaxed">
            Sign in to manage your Skaftin plans, track your Stars rewards, and build the perfect lunchbox for your little ones.
          </p>
          <div className="mt-8 flex items-center gap-3 bg-white/40 rounded-2xl px-4 py-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-black text-sm text-ink">Earn Skaftin Stars</p>
              <p className="text-xs text-ink/70">50 bonus stars on your first sign-in</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs font-bold text-ink/60 uppercase tracking-wider">Established 1917 · South Africa&apos;s #1 Meat Brand</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Eskort" className="h-9 w-auto" />
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="font-display font-black text-3xl text-ink uppercase tracking-tight mb-2">Sign In</h2>
            <p className="text-sm text-muted-foreground">Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="font-bold text-eskort-red hover:underline">Sign up free</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="signin-email" className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                Email Address
              </label>
              <input
                id="signin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-xl border-2 border-border focus:border-ink outline-none text-sm font-medium text-ink placeholder:text-neutral-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="signin-password" className="text-xs font-black uppercase tracking-wider text-ink">
                  Password
                </label>
                <button type="button" className="text-xs text-muted-foreground hover:text-eskort-red transition font-bold">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 pr-12 rounded-xl border-2 border-border focus:border-ink outline-none text-sm font-medium text-ink placeholder:text-neutral-400 transition"
                />
                <button
                  type="button"
                  id="signin-toggle-password"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-ink transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div role="alert" className="text-sm font-bold text-eskort-red bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="signin-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full h-13 bg-ink hover:bg-eskort-red text-white font-extrabold rounded-full text-sm flex items-center justify-center gap-2 shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>Sign In</span>
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
