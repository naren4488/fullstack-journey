import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { JourneySearchCombobox } from '../components/JourneySearchCombobox'
import { ThemeToggle } from '../components/ThemeToggle'
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff8ed_0%,_#f6efe5_36%,_#efe7dc_100%)] text-stone-900 transition-[background-image,color,background-color] duration-300 dark:bg-[radial-gradient(circle_at_top,_#1c1917_0%,_#0c0a09_42%,_#292524_100%)] dark:text-stone-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav
            className="flex flex-wrap items-center gap-3"
            aria-label="Primary"
          >
          <Link
            to="/"
            className="rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors duration-300 hover:border-amber-400 hover:text-amber-800 dark:border-stone-600 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:border-amber-500 dark:hover:text-amber-300"
          >
            Roadmap
          </Link>
          <Link
            to="/projects"
            className="rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors duration-300 hover:border-amber-400 hover:text-amber-800 dark:border-stone-600 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:border-amber-500 dark:hover:text-amber-300"
          >
            Practice projects
          </Link>
        </nav>
        <div className="flex w-full flex-col gap-3 sm:ml-auto sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-end">
          {onSearch != null && modules != null ? (
            <div className="w-full max-w-lg sm:w-[min(100%,28rem)]">
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
          <ThemeToggle />
        </div>
        </div>
        {children}
      </div>
    </main>
  )
}
