'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { createDemoSession, shouldUseDemoMode } from '@/lib/demo-data'

const highlights = [
  'Dispatch approved supplier calls from your dashboard',
  'Track transcripts, confidence, and next actions per request',
  'Manage restock orders from preparing to delivered',
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (shouldUseDemoMode()) {
        createDemoSession({
          email,
          role: 'customer',
          companyName: email.split('@')[0] ? `${email.split('@')[0]} Demo Co` : 'Demo Customer Co',
          phoneNumber: '+65 6123 4567',
          mainUseCase: 'supplier-follow-up',
        })
        router.push('/customer')
        return
      }

      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Auth is not connected yet in this environment. The interface is ready for the backend wiring.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1fr_0.92fr]">
        <section className="relative hidden overflow-hidden border-r border-slate-800 bg-slate-900 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(37,99,235,0.28),transparent_30%),radial-gradient(circle_at_78%_64%,rgba(20,184,166,0.20),transparent_34%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <PhoneCall className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Vendor Wrangler</p>
                <p className="text-xs text-slate-400">Ops Concierge</p>
              </div>
            </Link>

            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure company workspace
              </div>
              <h1 className="text-5xl font-bold leading-tight tracking-normal">
                Pick up exactly where your ops team left off.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Sign in to review call reports, launch vendor follow-ups, manage inventory, and keep supplier work visible across the company.
              </p>
            </div>

            <div className="grid gap-3">
              {highlights.map(item => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-teal-300" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <PhoneCall className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Vendor Wrangler</p>
                    <p className="text-xs text-slate-400">Ops Concierge</p>
                  </div>
                </Link>
                <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-white">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40 sm:p-8">
              <div className="mb-6 hidden items-center justify-between lg:flex">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                  Back to website
                </Link>
                <Link href="/pricing" className="text-sm font-medium text-blue-300 transition hover:text-blue-200">
                  Pricing
                </Link>
              </div>

              <div className="mb-7">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                  <Building2 className="h-3.5 w-3.5 text-blue-300" />
                  Company login
                </div>
                <h2 className="text-2xl font-bold tracking-normal text-white">Welcome back</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Access your customer, supplier, or admin dashboard.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-3 text-sm leading-6 text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Work email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-300">Password</label>
                    <button type="button" className="text-xs text-slate-500 transition hover:text-slate-300">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-10 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(value => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500',
                    loading && 'cursor-not-allowed opacity-70'
                  )}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  {loading ? 'Signing in...' : 'Continue to dashboard'}
                </button>
              </form>

              <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3">
                <div className="flex gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  <p className="text-xs leading-5 text-slate-400">
                    New pilot teams can register now. Backend onboarding can be connected later without changing this flow.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-slate-400">
                New to Vendor Wrangler?{' '}
                <Link href="/auth/signup" className="font-medium text-blue-300 transition hover:text-blue-200">
                  Create a company account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
