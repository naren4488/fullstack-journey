export type { ModuleQuiz, ModuleQuizQuestion } from './moduleQuizzes.types'
import type { ModuleQuiz } from './moduleQuizzes.types'
import { moduleQuizzesPart1 } from './moduleQuizzes.part1'
import { moduleQuizzesPart2 } from './moduleQuizzes.part2'
import { moduleQuizzesPart3 } from './moduleQuizzes.part3'

/** All module quizzes merged (client-only, not graded). */
export const moduleQuizzesBySlug: Record<string, ModuleQuiz> = {
  ...moduleQuizzesPart1,
  ...moduleQuizzesPart2,
  ...moduleQuizzesPart3,
}

export function getModuleQuiz(moduleSlug: string): ModuleQuiz | undefined {
  return moduleQuizzesBySlug[moduleSlug]
}

export function hasModuleQuiz(moduleSlug: string): boolean {
  const q = moduleQuizzesBySlug[moduleSlug]
  return q != null && q.questions.length > 0
}
