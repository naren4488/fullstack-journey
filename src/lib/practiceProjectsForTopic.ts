import type { PracticeProject } from '../data/practiceProject'

/** Projects whose `learnings` include this exact topic label (module topic tracker). */
export function practiceProjectsForTopicLabel(
  projects: PracticeProject[],
  topicLabel: string,
): PracticeProject[] {
  return projects.filter((p) => p.learnings.some((l) => l === topicLabel))
}
