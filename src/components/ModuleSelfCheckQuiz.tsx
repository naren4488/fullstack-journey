import { useState } from 'react'
import type { ModuleQuiz, ModuleQuizQuestion } from '../data/moduleQuizzes'

function QuizQuestionBlock({
  question,
  index,
  totalQuestions,
}: {
  question: ModuleQuizQuestion
  index: number
  totalQuestions: number
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5 transition-colors duration-300 dark:border-stone-600 dark:bg-stone-800/50">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
        Question {index + 1} of {totalQuestions}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-stone-900 dark:text-stone-100">
        {question.prompt}
      </p>
      <ul className="mt-4 space-y-2">
        {question.choices.map((choice, i) => {
          const isCorrect = i === question.correctIndex
          const isPicked = picked === i
          const showAsCorrect = revealed && isCorrect
          const showAsWrong = revealed && isPicked && !isCorrect
          return (
            <li key={i}>
              <label
                className={[
                  'flex cursor-pointer gap-3 rounded-xl border px-3 py-2.5 text-sm transition',
                  showAsCorrect
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-950 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-100'
                    : showAsWrong
                      ? 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-600 dark:bg-rose-950/40 dark:text-rose-100'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-amber-300 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-amber-600',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name={question.id}
                  className="mt-0.5 h-4 w-4 shrink-0 border-stone-300 text-amber-600 focus:ring-amber-500"
                  checked={isPicked}
                  onChange={() => setPicked(i)}
                  disabled={revealed}
                />
                <span>{choice}</span>
              </label>
            </li>
          )
        })}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
        >
          Reveal answer
        </button>
        {revealed ? (
          <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
            Correct:{' '}
            <strong className="text-stone-900 dark:text-stone-100">
              {question.choices[question.correctIndex]}
            </strong>
          </span>
        ) : null}
      </div>
      {revealed && question.revealNote ? (
        <p className="mt-3 border-t border-stone-200 pt-3 text-sm leading-6 text-stone-600 dark:border-stone-600 dark:text-stone-400">
          {question.revealNote}
        </p>
      ) : null}
    </div>
  )
}

export function ModuleSelfCheckQuiz({ quiz }: { quiz: ModuleQuiz }) {
  const totalQuestions = quiz.questions.length

  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)] transition-colors duration-300 dark:border-stone-700/80 dark:bg-stone-900/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-800 dark:text-amber-400">
            Self-check quiz
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">
            {quiz.title}
          </h2>
          {quiz.blurb ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 dark:text-stone-400">
              {quiz.blurb}
            </p>
          ) : null}
        </div>
        <div className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold text-stone-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-300">
          Not graded · answers stay in this session only
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {quiz.questions.map((q, i) => (
          <QuizQuestionBlock
            key={q.id}
            question={q}
            index={i}
            totalQuestions={totalQuestions}
          />
        ))}
      </div>
    </section>
  )
}
