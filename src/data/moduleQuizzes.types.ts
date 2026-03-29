export type ModuleQuizQuestion = {
  id: string
  prompt: string
  choices: string[]
  /** Index into `choices` for the correct answer. */
  correctIndex: number
  /** Shown after “Reveal answer”. */
  revealNote?: string
}

export type ModuleQuiz = {
  moduleSlug: string
  title: string
  blurb?: string
  questions: ModuleQuizQuestion[]
}
