import { Link, useParams } from 'react-router-dom'
import { ModuleSelfCheckQuiz } from '../components/ModuleSelfCheckQuiz'
import { NotFoundPage } from '../components/NotFoundPage'
import { getModuleBySlug } from '../data/modules'
import { getModuleQuiz } from '../data/moduleQuizzes'
import { Shell } from '../layout/Shell'

/** Route: `/modules/:moduleSlug/quiz` */
export function ModuleQuizPage() {
  const { moduleSlug = '' } = useParams()
  const moduleMeta = getModuleBySlug(moduleSlug)
  const quiz = getModuleQuiz(moduleSlug)

  if (!moduleMeta) {
    return <NotFoundPage />
  }

  if (!quiz) {
    return (
      <Shell>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to={`/modules/${moduleSlug}`}
            className="inline-flex items-center rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-400 hover:text-amber-700"
          >
            Back to {moduleMeta.title}
          </Link>
        </div>
        <section className="rounded-[1.75rem] border border-stone-200 bg-white/80 p-8 text-center shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
          <h1 className="text-xl font-bold text-stone-950">Practice questions</h1>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            Practice questions for this module are not available yet.
          </p>
        </section>
      </Shell>
    )
  }

  const modulePath = `/modules/${moduleSlug}`

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to={modulePath}
          className="inline-flex items-center rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-400 hover:text-amber-700"
        >
          Back to {moduleMeta.title} module
        </Link>
        <div className="rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-xs font-semibold text-stone-600">
          {quiz.questions.length} questions · self-check
        </div>
      </div>

      <ModuleSelfCheckQuiz quiz={quiz} />
    </Shell>
  )
}
