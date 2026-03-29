const STORAGE_KEY = 'journey-project-requirement-checks'

export type RequirementChecksMap = Record<string, boolean[]>

function readAll(): RequirementChecksMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as RequirementChecksMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeAll(map: RequirementChecksMap) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

export function storageKeyForProject(moduleSlug: string, projectSlug: string): string {
  return `${moduleSlug}/${projectSlug}`
}

export function loadRequirementChecks(
  moduleSlug: string,
  projectSlug: string,
  length: number,
): boolean[] {
  const key = storageKeyForProject(moduleSlug, projectSlug)
  const all = readAll()
  const saved = all[key]
  if (!Array.isArray(saved) || saved.length !== length) {
    return Array.from({ length }, () => false)
  }
  return saved.map(Boolean)
}

export function saveRequirementChecks(
  moduleSlug: string,
  projectSlug: string,
  checks: boolean[],
): void {
  const key = storageKeyForProject(moduleSlug, projectSlug)
  const all = readAll()
  all[key] = checks
  writeAll(all)
}
