export type ProjectSubmission = {
  githubUrl: string
  liveDemoUrl: string
  submittedAt: number // timestamp
}

export type SubmissionsMap = Record<string, ProjectSubmission>

const STORAGE_KEY = 'journey-project-submissions'

function readAll(): SubmissionsMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as SubmissionsMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeAll(map: SubmissionsMap) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

export function storageKeyForProject(moduleSlug: string, projectSlug: string): string {
  return `${moduleSlug}/${projectSlug}`
}

export function loadSubmission(
  moduleSlug: string,
  projectSlug: string,
): ProjectSubmission | null {
  const key = storageKeyForProject(moduleSlug, projectSlug)
  const all = readAll()
  const submission = all[key]
  return submission || null
}

export function saveSubmission(
  moduleSlug: string,
  projectSlug: string,
  submission: ProjectSubmission,
): void {
  const key = storageKeyForProject(moduleSlug, projectSlug)
  const all = readAll()
  all[key] = submission
  writeAll(all)
}

export function deleteSubmission(
  moduleSlug: string,
  projectSlug: string,
): void {
  const key = storageKeyForProject(moduleSlug, projectSlug)
  const all = readAll()
  delete all[key]
  writeAll(all)
}

export function isValidUrl(url: string): boolean {
  if (!url.trim()) return false
  try {
    // Check for GitHub URLs
    if (url.includes('github')) {
      return /^https:\/\/github\.com\/[\w-]+\/[\w.-]+(\/)?$/.test(url)
    }
    // Check for general URLs (http or https)
    new URL(url)
    return true
  } catch {
    return false
  }
}
