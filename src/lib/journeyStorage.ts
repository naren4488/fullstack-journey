import type { Module } from '../data/modules'

export const JOURNEY_MODULES_STORAGE_KEY = 'journey-modules-progress'

/** Keeps topic list and copy in sync with `modules.ts` while restoring `done` by module slug + topic label. */
export function mergeStoredProgress(canonical: Module[], storedRaw: string | null): Module[] {
  if (!storedRaw) {
    return canonical
  }

  let stored: unknown
  try {
    stored = JSON.parse(storedRaw)
  } catch {
    return canonical
  }

  if (!Array.isArray(stored)) {
    return canonical
  }

  const doneBySlugAndLabel = new Map<string, Map<string, boolean>>()

  for (const mod of stored) {
    if (!mod || typeof mod !== 'object' || !('slug' in mod) || !('topics' in mod)) {
      continue
    }
    const slug = (mod as Module).slug
    const topics = (mod as Module).topics
    if (typeof slug !== 'string' || !Array.isArray(topics)) {
      continue
    }
    const labelMap = new Map<string, boolean>()
    for (const t of topics) {
      if (t && typeof t === 'object' && typeof t.label === 'string') {
        labelMap.set(t.label, !!t.done)
      }
    }
    doneBySlugAndLabel.set(slug, labelMap)
  }

  return canonical.map((module) => {
    const labelMap = doneBySlugAndLabel.get(module.slug)
    if (!labelMap) {
      return module
    }
    return {
      ...module,
      topics: module.topics.map((topic) => {
        const storedDone = labelMap.get(topic.label)
        if (storedDone === undefined) {
          return topic
        }
        return { ...topic, done: storedDone }
      }),
    }
  })
}
