import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'

const controls = [
  {
    title: 'Human approval before calls',
    text: 'The intended flow keeps users in control of the request and call brief before vendor outreach.',
    icon: UserCheck,
  },
  {
    title: 'Company-scoped dashboards',
    text: 'Supabase RLS is the intended protection layer for keeping each user and company data isolated.',
    icon: LockKeyhole,
  },
  {
    title: 'Transcript audit trail',
    text: 'Every completed call can be saved with transcript, outcome, confidence, and recommended next step.',
    icon: ClipboardCheck,
  },
  {
    title: 'Demo safety mode',
    text: 'Mock calls let pilots test the full UI without placing real PSTN calls while setup is still in progress.',
    icon: Eye,
  },
]

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/contact" className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900">
            Ask a question
          </Link>
        </div>
      </header>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/25 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Trust and safety
          </div>
          <h1 className="text-4xl font-bold tracking-normal sm:text-5xl">Built for controlled pilots first.</h1>
          <p className="mt-4 text-base leading-7 text-slate-400">
            This product touches vendors, transcripts, and company operations. The first version should be tested with clear limits, explicit approvals, and tight data access rules.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-2">
          {controls.map(control => {
            const Icon = control.icon
            return (
              <article key={control.title} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <Icon className="h-6 w-6 text-blue-300" />
                <h2 className="mt-5 text-lg font-semibold">{control.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{control.text}</p>
              </article>
            )
          })}
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
            <p className="text-sm leading-6 text-slate-300">
              Before paid launch, the important backend work is Supabase schema finalization, RLS policy review, call consent language, rate limits, and audit logs for production calls.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
