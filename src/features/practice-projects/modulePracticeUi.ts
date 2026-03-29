/** Accent styles for practice cards and detail badges per roadmap module slug. */
export type ModulePracticeUi = {
  badgeClass: string
  taglineClass: string
  sectionBorderClass: string
  sectionHeadingClass: string
  cardRingClass: string
  chipClass: string
  ctaHoverClass: string
}

const DEFAULT: ModulePracticeUi = {
  badgeClass: 'border-stone-300 bg-stone-100 text-stone-800',
  taglineClass: 'text-stone-600',
  sectionBorderClass: 'border-stone-200/80',
  sectionHeadingClass: 'text-stone-800',
  cardRingClass: 'border-stone-200',
  chipClass: 'text-stone-200',
  ctaHoverClass: 'group-hover:text-amber-200',
}

export const MODULE_PRACTICE_UI: Record<string, ModulePracticeUi> = {
  html: {
    badgeClass: 'border-amber-200 bg-amber-50 text-amber-800',
    taglineClass: 'text-amber-700',
    sectionBorderClass: 'border-amber-200/80',
    sectionHeadingClass: 'text-amber-700',
    cardRingClass: 'border-stone-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-amber-200',
  },
  css: {
    badgeClass: 'border-sky-200 bg-sky-50 text-sky-900',
    taglineClass: 'text-sky-800',
    sectionBorderClass: 'border-sky-200/80',
    sectionHeadingClass: 'text-sky-800',
    cardRingClass: 'border-sky-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-sky-200',
  },
  javascript: {
    badgeClass: 'border-violet-200 bg-violet-50 text-violet-900',
    taglineClass: 'text-violet-800',
    sectionBorderClass: 'border-violet-200/80',
    sectionHeadingClass: 'text-violet-800',
    cardRingClass: 'border-violet-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-violet-200',
  },
  'browser-web-concepts': {
    badgeClass: 'border-cyan-200 bg-cyan-50 text-cyan-900',
    taglineClass: 'text-cyan-800',
    sectionBorderClass: 'border-cyan-200/80',
    sectionHeadingClass: 'text-cyan-800',
    cardRingClass: 'border-cyan-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-cyan-200',
  },
  'tools-workflow': {
    badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    taglineClass: 'text-emerald-800',
    sectionBorderClass: 'border-emerald-200/80',
    sectionHeadingClass: 'text-emerald-800',
    cardRingClass: 'border-emerald-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-emerald-200',
  },
  'react-core': {
    badgeClass: 'border-blue-200 bg-blue-50 text-blue-900',
    taglineClass: 'text-blue-800',
    sectionBorderClass: 'border-blue-200/80',
    sectionHeadingClass: 'text-blue-800',
    cardRingClass: 'border-blue-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-blue-200',
  },
  'react-intermediate': {
    badgeClass: 'border-indigo-200 bg-indigo-50 text-indigo-900',
    taglineClass: 'text-indigo-800',
    sectionBorderClass: 'border-indigo-200/80',
    sectionHeadingClass: 'text-indigo-800',
    cardRingClass: 'border-indigo-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-indigo-200',
  },
  'react-advanced': {
    badgeClass: 'border-purple-200 bg-purple-50 text-purple-900',
    taglineClass: 'text-purple-800',
    sectionBorderClass: 'border-purple-200/80',
    sectionHeadingClass: 'text-purple-800',
    cardRingClass: 'border-purple-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-purple-200',
  },
  routing: {
    badgeClass: 'border-orange-200 bg-orange-50 text-orange-900',
    taglineClass: 'text-orange-800',
    sectionBorderClass: 'border-orange-200/80',
    sectionHeadingClass: 'text-orange-800',
    cardRingClass: 'border-orange-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-orange-200',
  },
  'api-handling': {
    badgeClass: 'border-teal-200 bg-teal-50 text-teal-900',
    taglineClass: 'text-teal-800',
    sectionBorderClass: 'border-teal-200/80',
    sectionHeadingClass: 'text-teal-800',
    cardRingClass: 'border-teal-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-teal-200',
  },
  authentication: {
    badgeClass: 'border-rose-200 bg-rose-50 text-rose-900',
    taglineClass: 'text-rose-800',
    sectionBorderClass: 'border-rose-200/80',
    sectionHeadingClass: 'text-rose-800',
    cardRingClass: 'border-rose-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-rose-200',
  },
  'forms-validation': {
    badgeClass: 'border-pink-200 bg-pink-50 text-pink-900',
    taglineClass: 'text-pink-800',
    sectionBorderClass: 'border-pink-200/80',
    sectionHeadingClass: 'text-pink-800',
    cardRingClass: 'border-pink-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-pink-200',
  },
  'ui-design': {
    badgeClass: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-900',
    taglineClass: 'text-fuchsia-800',
    sectionBorderClass: 'border-fuchsia-200/80',
    sectionHeadingClass: 'text-fuchsia-800',
    cardRingClass: 'border-fuchsia-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-fuchsia-200',
  },
  'performance-optimization': {
    badgeClass: 'border-lime-200 bg-lime-50 text-lime-900',
    taglineClass: 'text-lime-800',
    sectionBorderClass: 'border-lime-200/80',
    sectionHeadingClass: 'text-lime-800',
    cardRingClass: 'border-lime-200',
    chipClass: 'text-stone-200',
    ctaHoverClass: 'group-hover:text-lime-200',
  },
}

export function getModulePracticeUi(moduleSlug: string): ModulePracticeUi {
  return MODULE_PRACTICE_UI[moduleSlug] ?? DEFAULT
}
