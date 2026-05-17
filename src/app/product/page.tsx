import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  FileJson2,
  PackageCheck,
  PhoneCall,
  Radio,
  Truck,
} from 'lucide-react'

const steps = [
  { title: 'Request intake', text: 'A user types what they need the AI to ask a supplier or vendor.', icon: ClipboardList },
  { title: 'Call brief', text: 'The app creates a structured objective, questions, and escalation guardrails.', icon: FileJson2 },
  { title: 'Live call', text: 'The assistant places or simulates the call and streams progress back to the UI.', icon: Radio },
  { title: 'Saved report', text: 'The result is cleaned, structured, and saved for the company dashboard.', icon: PackageCheck },
]

const dashboards = [
  {
    title: 'Customer workspace',
    text: 'Track inventory, identify low-stock items, call linked suppliers, and review call reports.',
    icon: PackageCheck,
  },
  {
    title: 'Supplier workspace',
    text: 'Manage available stock, see incoming restock requests, and move orders through delivery states.',
    icon: Truck,
  },
]

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white">
              Pricing
            </Link>
            <Link href="/auth/signup" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-blue-100">
              Start pilot
            </Link>
          </div>
        </div>
      </header>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <PhoneCall className="h-3.5 w-3.5" />
              Product workflow
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
              From messy vendor request to clean operations record.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Vendor Wrangler is a call delegation system for small teams that need supplier answers but do not have a procurement department. It turns calls into visible, trackable work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
                Create workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/security" className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-900">
                Security notes
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <article key={step.title} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step {index + 1}</p>
                      <h2 className="mt-1 font-semibold">{step.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/60 px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          {dashboards.map(item => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                <Icon className="h-6 w-6 text-teal-300" />
                <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
