import type { Module } from '../data/modules'

export function getModuleBySlugFromList(modules: Module[], slug: string) {
  return modules.find((module) => module.slug === slug)
}

export function getModuleProgress(module: Module) {
  const completed = module.topics.filter((topic) => topic.done).length
  const total = module.topics.length

  return {
    completed,
    total,
    remaining: total - completed,
    percent: Math.round((completed / total) * 100),
  }
}
