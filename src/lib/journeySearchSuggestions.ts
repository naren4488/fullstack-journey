import type { Module } from '../data/modules'
import type { PracticeProject } from '../data/practiceProject'
import { getPracticeProjectsForModule } from '../data/practiceProjectLookup'
import { normalizeSearchQuery, textMatchesQuery } from './searchNormalize'
import { topicRowId } from './topicRowId'

export type SuggestionKind = 'module' | 'topic' | 'project'

export type JourneySearchSuggestion = {
  id: string
  kind: SuggestionKind
  title: string
  subtitle?: string
  href: string
}

export type GroupedSuggestions = {
  modules: JourneySearchSuggestion[]
  topics: JourneySearchSuggestion[]
  projects: JourneySearchSuggestion[]
}

const MAX_PER_GROUP = 8

function matchScore(haystack: string, q: string): number {
  const h = haystack.toLowerCase()
  const i = h.indexOf(q)
  return i === -1 ? 10_000 : i
}

function bestModuleScore(m: Module, q: string): number {
  return Math.min(
    matchScore(m.title, q),
    matchScore(m.subtitle, q),
    matchScore(m.summary, q),
    matchScore(m.slug, q),
  )
}

/** Roadmap-wide: modules, topics (all modules), all practice projects. */
export function buildGlobalSuggestions(
  modules: Module[],
  qRaw: string,
): GroupedSuggestions {
  const q = normalizeSearchQuery(qRaw)
  const empty: GroupedSuggestions = { modules: [], topics: [], projects: [] }
  if (!q) return empty

  const modList: JourneySearchSuggestion[] = modules
    .map((m) => ({ m, s: bestModuleScore(m, q) }))
    .filter((x) => x.s < 10_000)
    .sort((a, b) => a.s - b.s || a.m.title.localeCompare(b.m.title))
    .slice(0, MAX_PER_GROUP)
    .map(({ m }) => ({
      id: `mod-${m.slug}`,
      kind: 'module' as const,
      title: m.title,
      subtitle: m.subtitle,
      href: `/modules/${m.slug}`,
    }))

  const topicList: JourneySearchSuggestion[] = []
  for (const m of modules) {
    for (const topic of m.topics) {
      if (!textMatchesQuery(topic.label, q)) continue
      topicList.push({
        id: `top-${m.slug}-${topic.label}`,
        kind: 'topic',
        title: topic.label,
        subtitle: m.title,
        href: `/modules/${m.slug}#${topicRowId(topic.label)}`,
      })
    }
  }
  topicList.sort(
    (a, b) =>
      matchScore(a.title, q) - matchScore(b.title, q) ||
      a.title.localeCompare(b.title),
  )
  const topics = topicList.slice(0, MAX_PER_GROUP)

  const projectList: JourneySearchSuggestion[] = []
  for (const m of modules) {
    const projects = getPracticeProjectsForModule(m.slug)
    for (const p of projects) {
      const hay = [p.title, p.tagline, p.summary, ...p.learnings].join(' ')
      if (!textMatchesQuery(hay, q)) continue
      projectList.push({
        id: `proj-${m.slug}-${p.slug}`,
        kind: 'project',
        title: p.title,
        subtitle: m.title,
        href: `/modules/${m.slug}/projects/${p.slug}`,
      })
    }
  }
  projectList.sort(
    (a, b) =>
      matchScore(a.title, q) - matchScore(b.title, q) ||
      a.title.localeCompare(b.title),
  )
  const projects = projectList.slice(0, MAX_PER_GROUP)

  return { modules: modList, topics, projects }
}

/** Single module: topics + its practice projects only. */
export function buildModuleScopedSuggestions(
  module: Module,
  practiceProjects: PracticeProject[],
  qRaw: string,
): GroupedSuggestions {
  const q = normalizeSearchQuery(qRaw)
  const empty: GroupedSuggestions = { modules: [], topics: [], projects: [] }
  if (!q) return empty

  const topics: JourneySearchSuggestion[] = module.topics
    .filter((topic) => textMatchesQuery(topic.label, q))
    .map((topic) => ({
      id: `top-${module.slug}-${topic.label}`,
      kind: 'topic' as const,
      title: topic.label,
      subtitle: 'Topic',
      href: `/modules/${module.slug}#${topicRowId(topic.label)}`,
    }))
    .sort(
      (a, b) =>
        matchScore(a.title, q) - matchScore(b.title, q) ||
        a.title.localeCompare(b.title),
    )
    .slice(0, MAX_PER_GROUP)

  const projects: JourneySearchSuggestion[] = practiceProjects
    .filter((p) => {
      const hay = [p.title, p.tagline, p.summary, ...p.learnings].join(' ')
      return textMatchesQuery(hay, q)
    })
    .map((p) => ({
      id: `proj-${module.slug}-${p.slug}`,
      kind: 'project' as const,
      title: p.title,
      subtitle: p.tagline,
      href: `/modules/${module.slug}/projects/${p.slug}`,
    }))
    .sort(
      (a, b) =>
        matchScore(a.title, q) - matchScore(b.title, q) ||
        a.title.localeCompare(b.title),
    )
    .slice(0, MAX_PER_GROUP)

  return { modules: [], topics, projects }
}

export function flattenSuggestions(g: GroupedSuggestions): JourneySearchSuggestion[] {
  return [...g.modules, ...g.topics, ...g.projects]
}
