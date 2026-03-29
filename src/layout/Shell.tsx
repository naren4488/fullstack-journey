import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { JourneySearchCombobox } from '../components/JourneySearchCombobox'
import type { Module } from '../data/modules'
import type { PracticeProject } from '../data/practiceProject'

export function Shell({
  children,
  searchQuery = '',
  onSearch,
  modules,
  scopedModule,
  scopedPracticeProjects,
}: {
  children: ReactNode
  searchQuery?: string
  onSearch?: (query: string) => void
  modules?: Module[]
  scopedModule?: Module
  scopedPracticeProjects?: PracticeProject[]
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff8ed_0%,_#f6efe5_36%,_#efe7dc_100%)] text-stone-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav
            className="flex flex-wrap items-center gap-3"
            aria-label="Primary"
          >
          <Link
            to="/"
            className="rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-400 hover:text-amber-800"
          >
            Roadmap
          </Link>
          <Link
            to="/projects"
            className="rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-400 hover:text-amber-800"
          >
            Practice projects
          </Link>
        </nav>
        {onSearch != null && modules != null ? (
          <div className="w-full max-w-lg">
            <JourneySearchCombobox
              id="global-search"
              label="Search roadmap and modules"
              value={searchQuery}
              onChange={onSearch}
              modules={modules}
              scopedModule={scopedModule}
              scopedPracticeProjects={scopedPracticeProjects}
              placeholder="Type module name, topic, or keyword…"
            />
          </div>
        ) : null}
        </div>
        {children}
      </div>
    </main>
  )
}
