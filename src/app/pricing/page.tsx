import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const plans = [
  {
    name: 'Pilot',
    price: '$0',
    detail: 'For early testers while we cover AI and call costs.',
    cta: 'Start pilot',
    href: '/auth/signup',
    features: ['5-10 real calls included', 'Customer or supplier dashboard', 'Mock mode for demos', 'Structured call reports'],
    highlight: true,
  },
  {
    name: 'Team',
    price: '$99',
    detail: 'For small teams running weekly supplier follow-ups.',
    cta: 'Join waitlist',
    href: '/contact',
    features: ['Shared company workspace', 'Inventory restock workflows', 'Supplier request tracking', 'Email support'],
    highlight: false,
  },
  {
    name: 'Ops',
    price: 'Custom',
    detail: 'For higher call volume and custom workflows.',
    cta: 'Talk to us',
    href: '/contact',
    features: ['Custom call scripts', 'Approval controls', 'Reporting exports', 'Security review support'],
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/auth/login" className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900">
            Sign in
          </Link>
        </div>
      </header>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/25 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200">
            <Sparkles className="h-3.5 w-3.5" />
            Pricing for pilot customers
          </div>
          <h1 className="text-4xl font-bold tracking-normal sm:text-5xl">Start free while we prove the value.</h1>
          <p className="mt-4 text-base leading-7 text-slate-400">
            For the first pilots, we cover the AI and phone call costs. The goal is simple: find out which workflows save real time before charging companies.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-4 lg:grid-cols-3">
          {plans.map(plan => (
            <article
              key={plan.name}
              className={`rounded-xl border p-6 ${
                plan.highlight
                  ? 'border-blue-500/60 bg-blue-500/10 shadow-xl shadow-blue-950/30'
                  : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{plan.name}</h2>
                {plan.highlight && (
                  <span className="rounded-full bg-blue-500 px-2.5 py-1 text-xs font-semibold text-white">Recommended</span>
                )}
              </div>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="pb-1 text-sm text-slate-500">/ month later</span>}
              </div>
              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">{plan.detail}</p>
              <Link
                href={plan.href}
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'border border-slate-700 text-slate-200 hover:bg-slate-800'
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <ul className="mt-6 space-y-3">
                {plan.features.map(feature => (
                  <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-teal-300" />
              <div>
                <p className="font-semibold">Pilot promise</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  No surprise billing during testing. We will agree on call limits before turning on paid usage.
                </p>
              </div>
            </div>
            <Link href="/product" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
              See product
              <PhoneCall className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
