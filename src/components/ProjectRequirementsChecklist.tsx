import { useState } from 'react'
import { FeatureIcon } from './FeatureIcon'
import {
  loadRequirementChecks,
  saveRequirementChecks,
} from '../lib/projectRequirementChecks'

export function ProjectRequirementsChecklist({
  moduleSlug,
  projectSlug,
  requirements,
}: {
  moduleSlug: string
  projectSlug: string
  requirements: string[]
}) {
  const [checks, setChecks] = useState<boolean[]>(() =>
    loadRequirementChecks(moduleSlug, projectSlug, requirements.length),
  )

  const done = checks.filter(Boolean).length

  function toggle(index: number) {
    setChecks((prev) => {
      const next =
        prev.length !== requirements.length
          ? requirements.map((_, i) => (i === index ? !prev[i] : !!prev[i]))
          : (() => {
              const copy = [...prev]
              copy[index] = !copy[index]
              return copy
            })()
      saveRequirementChecks(moduleSlug, projectSlug, next)
      return next
    })
  }

  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
            <FeatureIcon type="check" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-950">Project requirements</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Check items off as you complete them. Progress is saved in this browser only.
            </p>
          </div>
        </div>
        <div className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-semibold text-stone-700">
          {done} / {requirements.length} done
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {requirements.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 transition hover:border-amber-300">
              <input
                type="checkbox"
                checked={!!checks[index]}
                onChange={() => toggle(index)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <span
                className={[
                  'text-sm leading-6 text-stone-800',
                  checks[index] ? 'text-stone-500 line-through' : '',
                ].join(' ')}
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
