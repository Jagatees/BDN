import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Mail,
  MessageSquare,
  PhoneCall,
} from 'lucide-react'

const contactOptions = [
  {
    title: 'Pilot discovery',
    text: 'Use this for cafes, retailers, offices, or suppliers who want to test 5-10 real calls.',
    icon: CalendarDays,
  },
  {
    title: 'Supplier onboarding',
    text: 'Use this when a supplier wants a simple inventory and incoming request dashboard.',
    icon: Building2,
  },
  {
    title: 'Product feedback',
    text: 'Use this for testers reporting what worked, what felt risky, and what should be automated next.',
    icon: MessageSquare,
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/pricing" className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900">
            View pricing
          </Link>
        </div>
      </header>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <PhoneCall className="h-3.5 w-3.5" />
              Contact and demo
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
              Bring us one messy vendor workflow.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-400">
              For now, this is a frontend-ready pilot contact page. Use it to guide conversations with early testers before wiring a live CRM or email backend.
            </p>
            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-teal-300" />
                <div>
                  <p className="font-semibold">Pilot email placeholder</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Replace this with your real team email, calendar link, or CRM form when ready.
                  </p>
                  <p className="mt-3 text-sm font-medium text-blue-300">hello@vendorwrangler.app</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {contactOptions.map(option => {
              const Icon = option.icon
              return (
                <article key={option.title} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <Icon className="h-5 w-5 text-amber-300" />
                  <h2 className="mt-4 text-lg font-semibold">{option.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{option.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/60 px-5 py-14 text-center sm:px-8">
        <h2 className="text-2xl font-bold tracking-normal">Want to try the app UI first?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Create a workspace and choose customer or supplier mode. Backend wiring can be completed after the first pilot setup is ready.
        </p>
        <Link href="/auth/signup" className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
          Create workspace
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  )
}
