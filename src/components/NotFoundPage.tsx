import { Link } from 'react-router-dom'
import { Shell } from '../layout/Shell'

export function NotFoundPage() {
  return (
    <Shell>
      <section className="rounded-4xl border border-stone-200/80 bg-white/80 p-10 text-center shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500">
          404
        </p>
        <h1 className="mt-3 text-4xl font-black text-stone-950">
          Module not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
          The module you tried to open does not exist. Head back to the roadmap
          and pick one of the available modules.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Go to roadmap
        </Link>
      </section>
    </Shell>
  )
}
