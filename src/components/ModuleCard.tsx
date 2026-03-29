import { Link } from 'react-router-dom'
import type { Module } from '../data/modules'
import { getModuleProgress } from '../lib/moduleUtils'

export function ModuleCard({ module }: { module: Module }) {
  const stats = getModuleProgress(module)

  return (
    <Link
      to={`/modules/${module.slug}`}
      className="group rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-5 shadow-[0_16px_40px_rgba(87,57,24,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(87,57,24,0.12)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
            Module {module.id}
          </p>
          <h3 className="mt-2 text-xl font-bold text-stone-950">
            {module.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {module.subtitle}
          </p>
        </div>
        <div className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-semibold text-stone-700">
          {stats.percent}%
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600"
          style={{ width: `${stats.percent}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-stone-500">
        <span>
          {stats.completed} of {stats.total} topics done
        </span>
        <span className="font-semibold text-stone-900 group-hover:text-amber-700">
          Open details
        </span>
      </div>
    </Link>
  )
}
