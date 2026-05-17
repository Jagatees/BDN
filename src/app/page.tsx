import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  FileText,
  PackageCheck,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'

const workflows = [
  'Supplier availability and price checks',
  'Low-stock restock calls',
  'Delivery confirmation and order status',
  'Invoice, payment, and admin follow-ups',
]

const productCards = [
  {
    title: 'Plan',
    text: 'Turn a plain English request into a structured call brief with questions, guardrails, and goals.',
    icon: Sparkles,
  },
  {
    title: 'Call',
    text: 'Send the approved task to an AI caller that can speak with vendors and keep the team updated.',
    icon: PhoneCall,
  },
  {
    title: 'Report',
    text: 'Save the transcript, summary, confidence, and next action to the company dashboard.',
    icon: FileText,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <PhoneCall className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold">Vendor Wrangler</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-slate-400 md:flex">
            <Link href="/product" className="transition hover:text-white">Product</Link>
            <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
            <Link href="/security" className="transition hover:text-white">Security</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white">
              Sign in
            </Link>
            <Link href="/auth/signup" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-blue-100">
              Start pilot
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-800 px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(37,99,235,0.24),transparent_30%),radial-gradient(circle_at_82%_34%,rgba(20,184,166,0.18),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/25 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200">
              <Clock3 className="h-3.5 w-3.5" />
              AI ops concierge for supplier follow-ups
            </div>
            <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-normal sm:text-6xl">
              Stop losing hours to vendor phone calls.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Vendor Wrangler lets your team type a request, approve the call brief, and get a structured report after the AI handles supplier, delivery, inventory, or admin follow-ups.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
                Create workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-900">
                View pricing
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-slate-950/40">
            <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-sm font-semibold text-white">Live call workflow</p>
                <p className="mt-1 text-xs text-slate-500">From request to clean outcome</p>
              </div>
              <span className="rounded-full border border-teal-400/25 bg-teal-400/10 px-2.5 py-1 text-xs text-teal-200">
                Demo ready
              </span>
            </div>
            <div className="grid gap-3">
              {productCards.map(card => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{card.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{card.text}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Built for SaaS pilots</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal">Give small teams an operations desk.</h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              Start with the repetitive calls your team already makes every week. The product is designed for customer dashboards, supplier dashboards, and clear call reports.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {workflows.map(workflow => (
              <div key={workflow} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
                <CheckCircle2 className="h-4 w-4 text-teal-300" />
                <span className="text-sm text-slate-300">{workflow}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/60 px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
            <PackageCheck className="h-5 w-5 text-amber-300" />
            <h3 className="mt-4 font-semibold">Customer dashboard</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Track stock, launch vendor calls, and review reports.</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
            <Truck className="h-5 w-5 text-amber-300" />
            <h3 className="mt-4 font-semibold">Supplier dashboard</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Manage incoming requests, inventory, and order status.</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
            <ShieldCheck className="h-5 w-5 text-amber-300" />
            <h3 className="mt-4 font-semibold">Controlled rollout</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Pilot safely with mock mode, human approval, and company-scoped reports.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 text-center sm:px-8">
        <BarChart3 className="mx-auto h-7 w-7 text-blue-300" />
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-normal">
          Ready to test with real vendor workflows?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Create a workspace, choose customer or supplier mode, and start shaping the first pilot experience.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100">
            Start pilot
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-900">
            Talk to us
          </Link>
        </div>
      </section>
    </main>
  )
}
