import { useState } from 'react'
import { getPracticeProjectsForModule } from '../../data/practiceProjectLookup'
import { FeatureIcon } from '../../components/FeatureIcon'
import { getModulePracticeUi } from './modulePracticeUi'
import {
  loadRequirementChecks,
} from '../../lib/projectRequirementChecks'
import {
  useSubmitModuleMutation,
  useDeleteModuleSubmissionMutation,
} from '../../api/baseApi'
import toast from 'react-hot-toast'

export type ModuleSubmission = {
  githubUrl: string
  liveDemoUrl: string
  submittedAt: number
}

const STORAGE_KEY = 'journey-module-submissions'

function readAll(): Record<string, ModuleSubmission> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, ModuleSubmission>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeAll(map: Record<string, ModuleSubmission>) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

function loadModuleSubmission(moduleSlug: string): ModuleSubmission | null {
  const all = readAll()
  return all[moduleSlug] || null
}

function saveModuleSubmission(moduleSlug: string, submission: ModuleSubmission): void {
  const all = readAll()
  all[moduleSlug] = submission
  writeAll(all)
}

function deleteModuleSubmission(moduleSlug: string): void {
  const all = readAll()
  delete all[moduleSlug]
  writeAll(all)
}

function isValidUrl(url: string): boolean {
  if (!url.trim()) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function ModuleProjectSubmissionsOverview({
  moduleSlug,
}: {
  moduleSlug: string
}) {
  const [githubUrl, setGithubUrl] = useState(() => {
    const submission = loadModuleSubmission(moduleSlug)
    return submission?.githubUrl || ''
  })

  const [liveDemoUrl, setLiveDemoUrl] = useState(() => {
    const submission = loadModuleSubmission(moduleSlug)
    return submission?.liveDemoUrl || ''
  })

  const [submitted, setSubmitted] = useState(() => loadModuleSubmission(moduleSlug) !== null)
  const [isEditing, setIsEditing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [submitModule, { isLoading: isSubmitting }] = useSubmitModuleMutation()
  const [deleteModuleSubmissionApi, { isLoading: isDeleting }] = useDeleteModuleSubmissionMutation()

  const projects = getPracticeProjectsForModule(moduleSlug)

  if (projects.length === 0) return null

  const ui = getModulePracticeUi(moduleSlug)

  const combinedChecks = projects.map((project) => {
    const checks = loadRequirementChecks(moduleSlug, project.slug, project.requirements.length)
    return checks.every(Boolean) // true if all requirements for this project are done
  })

  // For module submission, require that all projects are complete
  const moduleReady = projects.length > 0 && combinedChecks.every(Boolean)
  const completedProjects = combinedChecks.filter(Boolean).length

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    // Validate: Check if all projects are complete
    if (!moduleReady) {
      setErrorMessage(
        `Please complete all ${projects.length} projects first. Currently ${completedProjects}/${projects.length} projects are ready.`
      )
      return
    }

    // Validate: GitHub URL
    if (!githubUrl.trim()) {
      setErrorMessage('GitHub repository URL is required.')
      return
    }

    if (!isValidUrl(githubUrl)) {
      setErrorMessage('Please enter a valid GitHub repository URL.')
      return
    }

    // Validate: Live Demo URL
    if (!liveDemoUrl.trim()) {
      setErrorMessage('Live demo link is required.')
      return
    }

    if (!isValidUrl(liveDemoUrl)) {
      setErrorMessage('Please enter a valid live demo URL.')
      return
    }

    const submission: ModuleSubmission = {
      githubUrl: githubUrl.trim(),
      liveDemoUrl: liveDemoUrl.trim(),
      submittedAt: Date.now(),
    }

    // Send module submission to backend
    try {
      await submitModule({
        moduleSlug,
        githubUrl: submission.githubUrl,
        liveUrl: submission.liveDemoUrl,
      }).unwrap()

      saveModuleSubmission(moduleSlug, submission)
      setSubmitted(true)
      setIsEditing(false)
      setSuccessMessage('Module submission successful! ✓')
      toast.success('Module submitted successfully! 🎉', { position: 'top-right', duration: 2000 })
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (err) {
      console.error('Failed to submit module', err)
      setErrorMessage('Failed to submit module. Please try again.')
      toast.error('Module submission failed. Please check your inputs and try again.', { position: 'top-right', duration: 3000 })
    }
  }

  function handleEdit() {
    setIsEditing(true)
    setErrorMessage('')
    setSuccessMessage('')
  }

  function handleCancel() {
    const submission = loadModuleSubmission(moduleSlug)
    if (submission) {
      setGithubUrl(submission.githubUrl)
      setLiveDemoUrl(submission.liveDemoUrl)
    } else {
      setGithubUrl('')
      setLiveDemoUrl('')
    }
    setIsEditing(false)
    setErrorMessage('')
    setSuccessMessage('')
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to remove this submission?')) {
      return
    }

    try {
      await deleteModuleSubmissionApi({ moduleSlug }).unwrap()
      deleteModuleSubmission(moduleSlug)
      setSubmitted(false)
      setIsEditing(false)
      setGithubUrl('')
      setLiveDemoUrl('')
      setErrorMessage('')
      setSuccessMessage('')
      toast.success('Module submission removed successfully.', { position: 'top-right', duration: 2000 })
    } catch (err) {
      console.error('Failed to delete module submission', err)
      setErrorMessage('Failed to delete module submission. Please try again.')
      toast.error('Failed to remove submission. Please try again.', { position: 'top-right', duration: 3000 })
    }
  }

  return (
    <section className={`rounded-[1.75rem] border bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)] ${ui.sectionBorderClass}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-900">
            <FeatureIcon type="flag" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-950">Project submissions</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Submit your GitHub repository and live demo after completing all {projects.length} projects.
            </p>
          </div>
        </div>
        {submitted && !isEditing && (
          <div className="rounded-full border border-green-300 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 flex items-center gap-2">
            <span>✓</span> Submitted
          </div>
        )}
      </div>

      {/* Completion Status */}
      {!moduleReady && !submitted && (
        <div className="mt-4 rounded-2xl border border-red-200/70 bg-red-50/60 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-900">
            Action Required
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-800">
            Complete all <strong>{projects.length} projects</strong> before submitting{' '}
            <strong>({completedProjects}/{projects.length} projects done)</strong>.
          </p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-semibold text-red-900">Error</p>
          <p className="mt-1 text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm font-semibold text-green-900">{successMessage}</p>
        </div>
      )}

      {/* Form or Display */}
      {!submitted || isEditing ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* GitHub URL Input */}
          <div>
            <label htmlFor="github-url" className="block text-sm font-semibold text-stone-900">
              GitHub Repository URL
            </label>
            <input
              id="github-url"
              type="text"
              placeholder="https://github.com/username/repo"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              disabled={!moduleReady && !submitted}
              className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-stone-500">
              Link to your GitHub repository with all project code.
            </p>
          </div>

          {/* Live Demo URL Input */}
          <div>
            <label htmlFor="demo-url" className="block text-sm font-semibold text-stone-900">
              Live Demo/Portfolio Link
            </label>
            <input
              id="demo-url"
              type="text"
              placeholder="https://my-portfolio.vercel.app"
              value={liveDemoUrl}
              onChange={(e) => setLiveDemoUrl(e.target.value)}
              disabled={!moduleReady && !submitted}
              className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-stone-500">
              Link to your deployed portfolio or project showcase (Vercel, Netlify, GitHub Pages, etc.)
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={!moduleReady || isSubmitting}
              className="flex-1 rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed sm:flex-none"
            >
              {submitted && !isEditing ? 'Update Submission' : 'Submit'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-xl border border-stone-300 px-6 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 sm:flex-none"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        // Submitted State Display
        <div className="mt-6 space-y-4">
          {/* GitHub URL Display */}
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-600">
              GitHub Repository
            </p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 break-all text-sm font-medium text-blue-600 hover:underline"
            >
              {githubUrl}
            </a>
          </div>

          {/* Live Demo URL Display */}
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-600">
              Live Demo / Portfolio
            </p>
            <a
              href={liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 break-all text-sm font-medium text-blue-600 hover:underline"
            >
              {liveDemoUrl}
            </a>
          </div>

          {/* Edit/Delete Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleEdit}
              className="flex-1 rounded-xl border border-stone-300 px-6 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 sm:flex-none"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 rounded-xl border border-red-300 px-6 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed sm:flex-none"
            >
              {isDeleting ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
