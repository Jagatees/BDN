'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  PackageCheck,
  Phone,
  PhoneCall,
  ShieldCheck,
  Store,
  User,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { createDemoSession, shouldUseDemoMode } from '@/lib/demo-data'
import type { UserRole } from '@/types'

const roles: Array<{
  value: Exclude<UserRole, 'admin'>
  title: string
  description: string
  icon: typeof User
}> = [
  {
    value: 'customer',
    title: 'Customer team',
    description: 'Call suppliers, manage stock, and review reports.',
    icon: User,
  },
  {
    value: 'supplier',
    title: 'Supplier team',
    description: 'Receive requests, manage inventory, and update orders.',
    icon: Store,
  },
]

const onboardingSteps = [
  'Create your company workspace',
  'Choose whether you buy from suppliers or supply customers',
  'Land in the right dashboard to set up calls and inventory',
]

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [mainUseCase, setMainUseCase] = useState('supplier-follow-up')
  const [role, setRole] = useState<Exclude<UserRole, 'admin'>>('customer')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const destination = useMemo(() => role === 'supplier' ? '/supplier' : '/customer', [role])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (shouldUseDemoMode()) {
        createDemoSession({
          email,
          role,
          companyName,
          phoneNumber,
          teamSize,
          mainUseCase,
        })
        router.push(destination)
        return
      }

      const supabase = createClient()

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            role,
            company_name: companyName || null,
            phone_number: phoneNumber || null,
            team_size: teamSize || null,
            main_use_case: mainUseCase,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      router.push(destination)
      router.refresh()
    } catch {
      setError('Signup backend is not connected yet. The onboarding interface is ready for Supabase when keys and tables are in place.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[0.92fr_1fr]">
        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-2xl">
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <PhoneCall className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Vendor Wrangler</p>
                  <p className="text-xs text-slate-400">Ops Concierge</p>
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <Link href="/" className="hidden items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-white sm:inline-flex">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
                <Link href="/auth/login" className="text-sm font-medium text-slate-400 transition hover:text-white">
                  Sign in
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40 sm:p-8">
              <div className="mb-7">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-400/25 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Pilot workspace setup
                </div>
                <h1 className="text-3xl font-bold tracking-normal text-white">Create your company account</h1>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Set up the frontend workspace now. Backend policies, call credits, and production auth can be wired in when ready.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-3 text-sm leading-6 text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-300">Workspace type</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {roles.map(option => {
                      const Icon = option.icon
                      const selected = role === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setRole(option.value)}
                          className={cn(
                            'rounded-lg border p-4 text-left transition',
                            selected
                              ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20'
                              : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={cn(
                                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                                selected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <div>
                              <p className={cn('text-sm font-semibold', selected ? 'text-white' : 'text-slate-200')}>
                                {option.title}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-slate-500">{option.description}</p>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300">Company name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                        placeholder="Acme Trading Pte Ltd"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300">
                      {role === 'supplier' ? 'Supplier phone number' : 'Main contact number'}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        required={role === 'supplier'}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                        placeholder="+65 6123 4567"
                      />
                    </div>
                  </div>

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
                    <label className="mb-1.5 block text-sm font-medium text-slate-300">Password</label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-10 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                        placeholder="Min 6 characters"
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

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300">Team size</label>
                    <select
                      value={teamSize}
                      onChange={e => setTeamSize(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                    >
                      <option value="">Select team size</option>
                      <option value="1-5">1-5 people</option>
                      <option value="6-20">6-20 people</option>
                      <option value="21-50">21-50 people</option>
                      <option value="51+">51+ people</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300">First workflow</label>
                    <select
                      value={mainUseCase}
                      onChange={e => setMainUseCase(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                    >
                      <option value="supplier-follow-up">Supplier follow-up calls</option>
                      <option value="inventory-restock">Inventory restock calls</option>
                      <option value="invoice-chasing">Invoice or payment chasing</option>
                      <option value="service-scheduling">Service scheduling</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">After signup</p>
                  <div className="mt-3 flex items-center gap-3 text-sm text-slate-300">
                    {role === 'supplier' ? (
                      <PackageCheck className="h-4 w-4 text-teal-300" />
                    ) : (
                      <ClipboardList className="h-4 w-4 text-teal-300" />
                    )}
                    You will continue to the {role === 'supplier' ? 'supplier' : 'customer'} dashboard to set up calls, inventory, and reports.
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
                  {loading ? 'Creating workspace...' : 'Create workspace'}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="relative hidden overflow-hidden border-l border-slate-800 bg-slate-900 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(20,184,166,0.22),transparent_34%),radial-gradient(circle_at_20%_78%,rgba(37,99,235,0.22),transparent_36%)]" />
          <div className="relative z-10 flex h-full flex-col justify-center p-10 xl:p-14">
            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">From signup to dashboard</p>
              <h2 className="mt-3 text-4xl font-bold leading-tight tracking-normal">
                A workspace for the calls your company should not be doing manually.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Customers get supplier call dispatch, inventory tracking, and reports. Suppliers get incoming restock requests, inventory controls, and order status updates.
              </p>
            </div>

            <div className="mt-10 grid gap-3">
              {onboardingSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm text-slate-200">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-300" />
                <div>
                  <p className="text-sm font-semibold text-white">Frontend-first pilot flow</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    The UI is ready for testers now, while Supabase policies, call credits, and production onboarding can be tightened behind it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
