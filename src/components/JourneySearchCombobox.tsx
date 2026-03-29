import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import type { Module } from '../data/modules'
import type { PracticeProject } from '../data/practiceProject'
import {
  flattenSuggestions,
  buildGlobalSuggestions,
  buildModuleScopedSuggestions,
  type JourneySearchSuggestion,
} from '../lib/journeySearchSuggestions'
import {
  getRecentSearches,
  pushRecentSearch,
} from '../lib/journeySearchRecent'
import { normalizeSearchQuery } from '../lib/searchNormalize'

const DEBOUNCE_MS = 160

const kindLabel: Record<JourneySearchSuggestion['kind'], string> = {
  module: 'Module',
  topic: 'Topic',
  project: 'Project',
}

export function JourneySearchCombobox({
  id,
  label,
  placeholder,
  value,
  onChange,
  modules,
  scopedModule,
  scopedPracticeProjects,
}: {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  modules: Module[]
  /** When set with projects, suggestions are limited to this module. */
  scopedModule?: Module
  scopedPracticeProjects?: PracticeProject[]
}) {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [debouncedQuery, setDebouncedQuery] = useState(() => value)
  const [highlightResetKey, setHighlightResetKey] = useState(() => ({
    value,
    debouncedQuery,
    open,
  }))

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(value), DEBOUNCE_MS)
    return () => window.clearTimeout(t)
  }, [value])

  const isModuleScope =
    scopedModule != null && scopedPracticeProjects != null

  const grouped = useMemo(() => {
    const q = normalizeSearchQuery(debouncedQuery)
    if (!q) {
      return { modules: [], topics: [], projects: [] }
    }
    return isModuleScope
      ? buildModuleScopedSuggestions(
          scopedModule,
          scopedPracticeProjects,
          debouncedQuery,
        )
      : buildGlobalSuggestions(modules, debouncedQuery)
  }, [
    modules,
    debouncedQuery,
    isModuleScope,
    scopedModule,
    scopedPracticeProjects,
  ])

  const flat = useMemo(() => flattenSuggestions(grouped), [grouped])
  const recents = getRecentSearches()

  const hasQuery = normalizeSearchQuery(value) !== ''
  const showRecentsPanel = open && !hasQuery && recents.length > 0
  const showSuggestionsPanel = open && hasQuery

  if (
    value !== highlightResetKey.value ||
    debouncedQuery !== highlightResetKey.debouncedQuery ||
    open !== highlightResetKey.open
  ) {
    setHighlightResetKey({ value, debouncedQuery, open })
    setActiveIndex(-1)
  }

  const pickSuggestion = useCallback(
    (s: JourneySearchSuggestion) => {
      pushRecentSearch(value)
      navigate(s.href)
      setOpen(false)
      setActiveIndex(-1)
    },
    [navigate, value],
  )

  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setOpen(true)
      }
      return
    }

    const navigableCount = flat.length

    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      setActiveIndex(-1)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (navigableCount === 0) return
      setActiveIndex((i) => (i + 1) % navigableCount)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (navigableCount === 0) return
      setActiveIndex((i) => (i <= 0 ? navigableCount - 1 : i - 1))
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && activeIndex < flat.length) {
        pickSuggestion(flat[activeIndex])
      }
    }
  }

  const debouncedSynced =
    normalizeSearchQuery(debouncedQuery) === normalizeSearchQuery(value)
  const noMatches = hasQuery && debouncedSynced && flat.length === 0

  return (
    <div ref={rootRef} className="relative w-full max-w-xl">
      <label
        htmlFor={id}
        className="flex w-full flex-col gap-1.5 text-sm font-medium text-stone-700"
      >
        {label}
        <input
          id={id}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 && flat[activeIndex]
              ? `${id}-opt-${flat[activeIndex].id}`
              : undefined
          }
          aria-autocomplete="list"
          spellCheck={true}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-900 outline-none ring-amber-500/30 placeholder:text-stone-400 focus:ring-2"
        />
      </label>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-[min(70vh,24rem)] w-full overflow-auto rounded-xl border border-stone-200 bg-white py-2 shadow-lg"
        >
          {showRecentsPanel ? (
            <div className="px-2 pb-2">
              <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
                Recent searches
              </p>
              <ul className="space-y-0.5">
                {recents.map((r) => (
                  <li key={r}>
                    <button
                      type="button"
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-stone-800 hover:bg-amber-50"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        pushRecentSearch(r)
                        onChange(r)
                        setOpen(false)
                      }}
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {showSuggestionsPanel ? (
            <>
              {grouped.modules.length > 0 ? (
                <SuggestionGroup
                  title="Modules"
                  items={grouped.modules}
                  activeIndex={activeIndex}
                  flatOffset={0}
                  inputId={id}
                  onPick={pickSuggestion}
                  setActiveIndex={setActiveIndex}
                />
              ) : null}
              {grouped.topics.length > 0 ? (
                <SuggestionGroup
                  title="Topics"
                  items={grouped.topics}
                  activeIndex={activeIndex}
                  flatOffset={grouped.modules.length}
                  inputId={id}
                  onPick={pickSuggestion}
                  setActiveIndex={setActiveIndex}
                />
              ) : null}
              {grouped.projects.length > 0 ? (
                <SuggestionGroup
                  title="Projects"
                  items={grouped.projects}
                  activeIndex={activeIndex}
                  flatOffset={grouped.modules.length + grouped.topics.length}
                  inputId={id}
                  onPick={pickSuggestion}
                  setActiveIndex={setActiveIndex}
                />
              ) : null}
              {noMatches ? (
                <p className="px-4 py-3 text-sm text-stone-600">
                  No matches. Try a shorter keyword or check spelling.
                </p>
              ) : null}
            </>
          ) : null}

          {open && !showRecentsPanel && !hasQuery && recents.length === 0 ? (
            <p className="px-4 py-3 text-sm text-stone-500">
              Type to see modules, topics, and projects. Use ↑ ↓ and Enter to
              choose.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function SuggestionGroup({
  title,
  items,
  activeIndex,
  flatOffset,
  inputId,
  onPick,
  setActiveIndex,
}: {
  title: string
  items: JourneySearchSuggestion[]
  activeIndex: number
  flatOffset: number
  inputId: string
  onPick: (s: JourneySearchSuggestion) => void
  setActiveIndex: (i: number) => void
}) {
  return (
    <div className="border-t border-stone-100 px-2 pt-2 first:border-t-0 first:pt-0">
      <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((s, idx) => {
          const flatIdx = flatOffset + idx
          const isActive = activeIndex === flatIdx
          return (
            <li
              key={s.id}
              id={`${inputId}-opt-${s.id}`}
              role="option"
              aria-selected={isActive}
              className={[
                'cursor-pointer rounded-lg px-3 py-2 text-sm',
                isActive ? 'bg-amber-100 text-stone-950' : 'hover:bg-stone-50',
              ].join(' ')}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActiveIndex(flatIdx)}
              onClick={() => onPick(s)}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-stone-900">{s.title}</span>
                <span className="shrink-0 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-600">
                  {kindLabel[s.kind]}
                </span>
              </div>
              {s.subtitle ? (
                <p className="mt-0.5 line-clamp-2 text-xs text-stone-500">
                  {s.subtitle}
                </p>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
