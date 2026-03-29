import { modules } from '../data/modules'
import type { PracticeProject } from '../data/practiceProject'
import { practiceProjectsByModuleSlug } from '../data/practiceProjectsRegistry'

export type ListedPracticeProject = {
  moduleSlug: string
  moduleTitle: string
  project: PracticeProject
}

/** Flat list of every practice project with its module (roadmap order). */
export function getAllListedPracticeProjects(): ListedPracticeProject[] {
  const out: ListedPracticeProject[] = []
  for (const mod of modules) {
    const projects = practiceProjectsByModuleSlug[mod.slug]
    if (!projects?.length) continue
    for (const project of projects) {
      out.push({
        moduleSlug: mod.slug,
        moduleTitle: mod.title,
        project,
      })
    }
  }
  return out
}

/** Parses strings like `45 min`, `45-60 min`, `75-100 min`. */
export function parseDurationRange(
  duration: string,
): { min: number; max: number } | null {
  const m = duration.match(/(\d+)(?:\s*-\s*(\d+))?\s*min/i)
  if (!m) return null
  const a = parseInt(m[1], 10)
  const b = m[2] ? parseInt(m[2], 10) : a
  return { min: Math.min(a, b), max: Math.max(a, b) }
}

export type DurationBucketId = 'any' | 'short' | 'medium' | 'long'

/** Buckets by midpoint of the stated range (unknown durations match every bucket). */
export function projectMatchesDurationBucket(
  duration: string,
  bucket: DurationBucketId,
): boolean {
  if (bucket === 'any') return true
  const range = parseDurationRange(duration)
  if (!range) return true
  const mid = (range.min + range.max) / 2
  if (bucket === 'short') return mid < 55
  if (bucket === 'medium') return mid >= 55 && mid < 85
  return mid >= 85
}
