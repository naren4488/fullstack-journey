export type PracticeCodeLanguage =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'tsx'
  | 'json'
  | 'bash'
  | 'text'

export type PracticeCodeSnippet = {
  fileLabel: string
  language: PracticeCodeLanguage
  code: string
  explanation: string
}

export type PracticeProjectCodeWalkthrough = {
  overview: string
  snippets: PracticeCodeSnippet[]
}

export type PracticeProject = {
  /** Suggested order within the module (1 = start here). Omitted entries keep source-array order after ordered items. */
  order?: number
  /** Topic labels from the module roadmap—links jump to the topic row on the module page. */
  recommendedAfterTopics?: string[]
  slug: string
  title: string
  tagline: string
  level: 'Beginner' | 'Beginner+' | 'Intermediate'
  duration: string
  summary: string
  brief: string
  /** One short paragraph on why this build is worth doing (pedagogy). */
  whyMatters?: string
  setup: string[]
  requirements: string[]
  learnings: string[]
  deliverables: string[]
  visualReferences: {
    image: string
    title: string
    sourceLabel: string
    sourceUrl: string
  }[]
  codeWalkthrough: PracticeProjectCodeWalkthrough
}
