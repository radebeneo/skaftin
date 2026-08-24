'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Clipboard, Heart, MapPin, LogOut, Star, ChevronRight, Plus, Trash2, Check, Edit2 } from 'lucide-react'
import { useAuthStore, loadProfile, saveProfile, type ProfileData, type SavedAddress } from '@/lib/auth'
import { useRewardsStore, TIER_EMOJI } from '@/lib/rewards-store'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

// ── Plan history from localStorage ───────────────────────────────────────────
function loadPlans(): { id: string; name: string; tier: string; stars: number; date: number }[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('eskort-plans') : null
    if (!raw) return []
    return JSON.parse(raw)
  } catch { return [] }
}

// ─── Account Tab ─────────────────────────────────────────────────────────────
function AccountTab({ user, onUpdate }: { user: NonNullable<ReturnType<typeof useAuthStore>['user']>; onUpdate: (name: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.displayName)
  const { stars, tier } = useRewardsStore()

  return (
    <div className="space-y-6">
      {/* Avatar + name */}
      <div className="flex items-center gap-5 p-6 bg-neutral-50 rounded-[24px] border border-border">
        <div className="w-16 h-16 rounded-full bg-ink flex items-center justify-center shrink-0">
          <span className="text-white font-black text-2xl">{user.displayName[0]?.toUpperCase()}</span>
        </div>
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                id="profile-name-input"
                value={name}
                onChange={e => setName(e.target.value)}
                className="flex-1 h-9 px-3 rounded-xl border-2 border-ink outline-none text-sm font-bold text-ink"
                autoFocus
              />
              <button
                id="profile-name-save"
                onClick={() => { onUpdate(name); setEditing(false) }}
                className="p-2 bg-ink text-white rounded-xl hover:bg-eskort-red transition"
                aria-label="Save name"
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="font-black text-lg text-ink truncate">{user.displayName}</p>
              <button id="profile-name-edit" onClick={() => setEditing(true)} aria-label="Edit name" className="text-muted-foreground hover:text-ink transition">
                <Edit2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          <p className="text-xs font-bold text-amber-600 mt-1">
            {TIER_EMOJI[tier]} {tier} member · {stars} Stars
          </p>
        </div>
      </div>

      {/* Account details */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Account Details</h3>
        {[
          { label: 'Email', value: user.email },
          { label: 'Member since', value: new Date(user.signedInAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) },
          { label: 'Member ID', value: user.id.slice(-8).toUpperCase() },
        ].map(field => (
          <div key={field.label} className="flex justify-between items-center p-4 bg-neutral-50 rounded-xl border border-border">
            <span className="text-sm font-bold text-muted-foreground">{field.label}</span>
            <span className="text-sm font-bold text-ink">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Plans Tab ────────────────────────────────────────────────────────────────
function PlansTab() {
  const [plans] = useState(() => loadPlans())

  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <Clipboard className="h-10 w-10 text-neutral-300" />
        <p className="font-bold text-lg text-ink">No plans yet</p>
        <p className="text-sm text-muted-foreground max-w-xs">Build your first Skaftin plan and it will appear here.</p>
        <Link href="/skaftin" className="bg-ink text-white font-extrabold px-6 py-3 rounded-full text-sm hover:bg-eskort-red transition">
          Build a Skaftin Plan
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4">Past Plans ({plans.length})</h3>
      {plans.map(plan => (
        <div key={plan.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-border hover:border-ink transition">
          <div>
            <p className="font-bold text-sm text-ink">{plan.name}</p>
            <p className="text-xs text-muted-foreground">{plan.tier} · {new Date(plan.date).toLocaleDateString('en-ZA')}</p>
          </div>
          <span className="font-black text-sm text-amber-600">+{plan.stars} ⭐</span>
        </div>
      ))}
    </div>
  )
}

// ─── Preferences Tab ──────────────────────────────────────────────────────────
function PreferencesTab({ profile, onChange }: { profile: ProfileData; onChange: (p: ProfileData) => void }) {
  const LIKES = ['Viennas', 'Bacon', 'Ham & Polony', 'Nuggets', 'Sausage Rolls', 'Cheese', 'Crackers', 'Fruit']
  const DISLIKES = ['No Spicy', 'No Tomato', 'Nut Free', 'Gluten Free', 'Dairy Free', 'No Veggies']

  function toggleLike(item: string) {
    const likes = profile.preferences.likes.includes(item)
      ? profile.preferences.likes.filter(l => l !== item)
      : [...profile.preferences.likes, item]
    onChange({ ...profile, preferences: { ...profile.preferences, likes } })
  }

  function toggleDislike(item: string) {
    const dislikes = profile.preferences.dislikes.includes(item)
      ? profile.preferences.dislikes.filter(d => d !== item)
      : [...profile.preferences.dislikes, item]
    onChange({ ...profile, preferences: { ...profile.preferences, dislikes } })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">Favourite Foods</h3>
        <div className="flex flex-wrap gap-2">
          {LIKES.map(item => {
            const selected = profile.preferences.likes.includes(item)
            return (
              <button
                key={item}
                id={`pref-like-${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => toggleLike(item)}
                className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition ${selected ? 'bg-ink border-ink text-white' : 'bg-white border-border text-ink hover:border-ink'}`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">Dietary Restrictions</h3>
        <div className="flex flex-wrap gap-2">
          {DISLIKES.map(item => {
            const selected = profile.preferences.dislikes.includes(item)
            return (
              <button
                key={item}
                id={`pref-dislike-${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => toggleDislike(item)}
                className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition ${selected ? 'bg-eskort-red border-eskort-red text-white' : 'bg-white border-border text-ink hover:border-eskort-red hover:text-eskort-red'}`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Preferences are saved automatically and used in Skaftin plan suggestions.</p>
    </div>
  )
}

// ─── Addresses Tab ────────────────────────────────────────────────────────────
function AddressesTab({ profile, onChange }: { profile: ProfileData; onChange: (p: ProfileData) => void }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ label: '', street: '', suburb: '', city: '', postalCode: '' })

  function addAddress() {
    if (!form.street.trim() || !form.city.trim()) return
    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      ...form,
      isDefault: profile.addresses.length === 0,
    }
    onChange({ ...profile, addresses: [...profile.addresses, newAddr] })
    setForm({ label: '', street: '', suburb: '', city: '', postalCode: '' })
    setShowForm(false)
  }

  function removeAddress(id: string) {
    onChange({ ...profile, addresses: profile.addresses.filter(a => a.id !== id) })
  }

  function setDefault(id: string) {
    onChange({ ...profile, addresses: profile.addresses.map(a => ({ ...a, isDefault: a.id === id })) })
  }

  return (
    <div className="space-y-4">
      {profile.addresses.map(addr => (
        <div key={addr.id} className={`p-4 rounded-xl border-2 transition ${addr.isDefault ? 'border-ink bg-neutral-50' : 'border-border bg-white'}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-sm text-ink">{addr.label || 'Saved Address'}</p>
                {addr.isDefault && <span className="text-[10px] font-black bg-ink text-white px-2 py-0.5 rounded-full">DEFAULT</span>}
              </div>
              <p className="text-xs text-muted-foreground">{addr.street}, {addr.suburb}</p>
              <p className="text-xs text-muted-foreground">{addr.city}, {addr.postalCode}</p>
            </div>
            <div className="flex items-center gap-2">
              {!addr.isDefault && (
                <button id={`addr-default-${addr.id}`} onClick={() => setDefault(addr.id)} className="text-[11px] font-bold text-muted-foreground hover:text-ink transition">Set default</button>
              )}
              <button id={`addr-remove-${addr.id}`} onClick={() => removeAddress(addr.id)} aria-label="Remove address" className="p-1.5 text-muted-foreground hover:text-eskort-red transition">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {showForm ? (
        <div className="p-5 rounded-xl border-2 border-dashed border-ink space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-ink">New Address</h4>
          {[
            { id: 'addr-label', key: 'label', placeholder: 'Label (e.g. Home, Work)', label: 'Label' },
            { id: 'addr-street', key: 'street', placeholder: '123 Main Street', label: 'Street Address' },
            { id: 'addr-suburb', key: 'suburb', placeholder: 'Suburb', label: 'Suburb' },
            { id: 'addr-city', key: 'city', placeholder: 'City', label: 'City' },
            { id: 'addr-postal', key: 'postalCode', placeholder: '0001', label: 'Postal Code' },
          ].map(field => (
            <div key={field.key}>
              <label htmlFor={field.id} className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{field.label}</label>
              <input
                id={field.id}
                value={form[field.key as keyof typeof form]}
                onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full h-10 px-3 rounded-xl border border-border focus:border-ink outline-none text-sm font-medium text-ink"
              />
            </div>
          ))}
          <div className="flex gap-2">
            <button id="addr-save-btn" onClick={addAddress} className="flex-1 bg-ink text-white font-extrabold py-2.5 rounded-full text-sm hover:bg-eskort-red transition">Save Address</button>
            <button id="addr-cancel-btn" onClick={() => setShowForm(false)} className="px-4 border border-border text-ink font-bold py-2.5 rounded-full text-sm hover:bg-neutral-100 transition">Cancel</button>
          </div>
        </div>
      ) : (
        <button
          id="addr-add-btn"
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border hover:border-ink py-4 rounded-xl text-sm font-bold text-muted-foreground hover:text-ink transition"
        >
          <Plus className="h-4 w-4" /> Add New Address
        </button>
      )}
    </div>
  )
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const router = useRouter()
  const { user, isSignedIn, signOut, updateUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'account' | 'plans' | 'preferences' | 'addresses'>('account')
  const [profile, setProfile] = useState<ProfileData>(() => loadProfile())

  useEffect(() => {
    if (!isSignedIn) router.replace('/sign-in')
  }, [isSignedIn, router])

  useEffect(() => {
    saveProfile(profile)
  }, [profile])

  if (!isSignedIn || !user) return null

  const tabs = [
    { id: 'account', label: 'My Account', icon: User },
    { id: 'plans', label: 'My Plans', icon: Clipboard },
    { id: 'preferences', label: 'Preferences', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ] as const

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Page heading */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-1">My Eskort Account</p>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-ink uppercase tracking-tight">
                Profile Settings
              </h1>
            </div>
            <button
              id="profile-sign-out-btn"
              onClick={() => { signOut(); router.replace('/') }}
              className="flex items-center gap-2 border border-border text-muted-foreground hover:text-eskort-red hover:border-eskort-red font-bold px-4 py-2.5 rounded-full text-sm transition"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar tabs */}
            <aside className="lg:w-64 shrink-0">
              <nav className="space-y-1" aria-label="Profile sections">
                {tabs.map(tab => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      id={`profile-tab-${tab.id}`}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition ${isActive ? 'bg-ink text-white shadow-sm' : 'text-muted-foreground hover:bg-neutral-100 hover:text-ink'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{tab.label}</span>
                      </div>
                      {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
                    </button>
                  )
                })}
              </nav>

              {/* Rewards summary widget */}
              <div className="mt-6 p-4 bg-ink rounded-2xl text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <p className="text-xs font-black uppercase tracking-wider text-white/60">Skaftin Stars</p>
                </div>
                <p className="font-black text-2xl text-white">{useRewardsStore().stars.toLocaleString()} ⭐</p>
                <p className="text-xs text-white/50 mt-1">{useRewardsStore().tier} tier</p>
              </div>
            </aside>

            {/* Tab content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-[24px] border border-border p-6 sm:p-8">
                {activeTab === 'account' && (
                  <AccountTab
                    user={user}
                    onUpdate={(name) => {
                      updateUser({ displayName: name })
                      setProfile(p => ({ ...p, displayName: name }))
                    }}
                  />
                )}
                {activeTab === 'plans' && <PlansTab />}
                {activeTab === 'preferences' && <PreferencesTab profile={profile} onChange={setProfile} />}
                {activeTab === 'addresses' && <AddressesTab profile={profile} onChange={setProfile} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
