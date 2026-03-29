import { cssProjects } from './cssProjects'
import { htmlProjects } from './htmlProjects'
import type { PracticeProject } from './practiceProject'
import {
  apiHandlingProjects,
  reactAdvancedProjects,
  reactIntermediateProjects,
  routingProjects,
} from './practice/extraPart2'
import {
  browserWebConceptsProjects,
  javascriptProjects,
  reactCoreProjects,
  toolsWorkflowProjects,
} from './practice/extraPart1'
import {
  authenticationProjects,
  formsValidationProjects,
  performanceOptimizationProjects,
  uiDesignProjects,
} from './practice/extraPart3'
import { thirdSupplementByModuleSlug } from './practice/thirdSupplement'

function appendThird(moduleSlug: string, base: PracticeProject[]): PracticeProject[] {
  const extra = thirdSupplementByModuleSlug[moduleSlug]
  return extra ? [...base, extra] : base
}

function sortByOptionalOrder(list: PracticeProject[]): PracticeProject[] {
  const hasOrder = list.some((p) => p.order != null)
  if (!hasOrder) return list
  return [...list]
    .map((p, i) => ({ p, i }))
    .sort((a, b) => {
      const ao = a.p.order
      const bo = b.p.order
      if (ao != null && bo != null) return ao - bo || a.i - b.i
      if (ao != null) return -1
      if (bo != null) return 1
      return a.i - b.i
    })
    .map(({ p }) => p)
}

/** Every roadmap module slug that exposes practice projects. */
export const practiceProjectsByModuleSlug: Record<string, PracticeProject[]> = {
  html: sortByOptionalOrder([...htmlProjects]),
  css: sortByOptionalOrder([...cssProjects]),
  javascript: sortByOptionalOrder(appendThird('javascript', [...javascriptProjects])),
  'browser-web-concepts': sortByOptionalOrder(
    appendThird('browser-web-concepts', [...browserWebConceptsProjects]),
  ),
  'tools-workflow': sortByOptionalOrder(appendThird('tools-workflow', [...toolsWorkflowProjects])),
  'react-core': sortByOptionalOrder(appendThird('react-core', [...reactCoreProjects])),
  'react-intermediate': sortByOptionalOrder(
    appendThird('react-intermediate', [...reactIntermediateProjects]),
  ),
  'react-advanced': sortByOptionalOrder(appendThird('react-advanced', [...reactAdvancedProjects])),
  routing: sortByOptionalOrder(appendThird('routing', [...routingProjects])),
  'api-handling': sortByOptionalOrder(appendThird('api-handling', [...apiHandlingProjects])),
  authentication: sortByOptionalOrder(appendThird('authentication', [...authenticationProjects])),
  'forms-validation': sortByOptionalOrder(
    appendThird('forms-validation', [...formsValidationProjects]),
  ),
  'ui-design': sortByOptionalOrder(appendThird('ui-design', [...uiDesignProjects])),
  'performance-optimization': sortByOptionalOrder(
    appendThird('performance-optimization', [...performanceOptimizationProjects]),
  ),
}

export function getPracticeProjectsForModule(moduleSlug: string): PracticeProject[] {
  return practiceProjectsByModuleSlug[moduleSlug] ?? []
}

export function getPracticeProjectForModule(
  moduleSlug: string,
  projectSlug: string,
): PracticeProject | undefined {
  return getPracticeProjectsForModule(moduleSlug).find((p) => p.slug === projectSlug)
}

export function moduleHasPracticeProjects(moduleSlug: string): boolean {
  return getPracticeProjectsForModule(moduleSlug).length > 0
}
