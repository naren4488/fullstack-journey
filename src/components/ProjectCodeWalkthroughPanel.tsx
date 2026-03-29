import { useEffect, useId, useState } from 'react'
import type { PracticeProject } from '../data/practiceProject'

export function ProjectCodeWalkthroughPanel({ project }: { project: PracticeProject }) {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const { codeWalkthrough } = project

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full border-2 border-stone-900 bg-amber-400 px-5 py-2.5 text-sm font-bold text-stone-950 shadow-sm transition hover:bg-amber-300"
      >
        View code
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
          role="presentation"
        >
          <button
            type="button"
            className="fixed inset-0 bg-stone-950/55 backdrop-blur-[2px]"
            aria-label="Close code panel"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 mt-4 w-full max-w-4xl rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                  Reference walkthrough
                </p>
                <h2 id={titleId} className="mt-1 text-xl font-bold text-stone-950 sm:text-2xl">
                  {project.title} — sample code
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Study this example, then build your own version from scratch. This is a teaching reference, not something to paste without understanding.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-400 hover:text-amber-800"
              >
                Close
              </button>
            </div>

            <div className="max-h-[min(70vh,720px)] space-y-8 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-stone-500">
                  Overview
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  {codeWalkthrough.overview}
                </p>
              </section>

              {codeWalkthrough.snippets.map((snippet) => (
                <section key={snippet.fileLabel} className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-stone-950">{snippet.fileLabel}</h3>
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-stone-600">
                      {snippet.language}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-stone-600">{snippet.explanation}</p>
                  <pre className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950 p-4 text-left text-xs leading-relaxed text-amber-100 sm:text-sm">
                    <code>{snippet.code.trimEnd()}</code>
                  </pre>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
