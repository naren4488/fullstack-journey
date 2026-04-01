import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FeatureIcon } from './FeatureIcon'
import {
  loadSubmission,
  saveSubmission,
  deleteSubmission,
  isValidUrl,
  type ProjectSubmission,
} from '../lib/projectSubmissions'
import {
  loadRequirementChecks,
} from '../lib/projectRequirementChecks'

import { useSubmitProjectMutation } from '../api/baseApi'

export function ProjectSubmissionForm({
  moduleSlug,
  projectSlug,
  requirements,
}: {
  moduleSlug: string
  projectSlug: string
  requirements: string[]
}) {
  const [submitProject, { isLoading: isSubmitting }] = useSubmitProjectMutation()
  const [githubUrl, setGithubUrl] = useState(() => {
    const submission = loadSubmission(moduleSlug, projectSlug)
    return submission?.githubUrl || ''
  })

  const [liveDemoUrl, setLiveDemoUrl] = useState(() => {
    const submission = loadSubmission(moduleSlug, projectSlug)
    return submission?.liveDemoUrl || ''
  })

  const [submitted, setSubmitted] = useState(
    () => loadSubmission(moduleSlug, projectSlug) !== null
  )
  const [isEditing, setIsEditing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Check if all requirements are completed
  const checks = loadRequirementChecks(moduleSlug, projectSlug, requirements.length)
  const allComplete = checks.every(Boolean)
  const completedCount = checks.filter(Boolean).length

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    // Validate: Check if all requirements are completed
    if (!allComplete) {
      setErrorMessage('Please complete all checklist items of this module first.')
      return
    }

    // Validate: GitHub URL
    if (!githubUrl.trim()) {
      setErrorMessage('GitHub repository URL is required.')
      return
    }

    if (!isValidUrl(githubUrl)) {
      setErrorMessage('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)')
      return
    }

    // Validate: Live Demo URL
    if (!liveDemoUrl.trim()) {
      setErrorMessage('Live demo link is required.')
      return
    }

    if (!isValidUrl(liveDemoUrl)) {
      setErrorMessage('Please enter a valid live demo URL (e.g., https://example.com)')
      return
    }

    try {
      await submitProject({
        moduleSlug,
        projectSlug,
        githubUrl: githubUrl.trim(),
        liveUrl: liveDemoUrl.trim(),
      }).unwrap()

      const submission: ProjectSubmission = {
        githubUrl: githubUrl.trim(),
        liveDemoUrl: liveDemoUrl.trim(),
        submittedAt: Date.now(),
      }

      saveSubmission(moduleSlug, projectSlug, submission)
      setSubmitted(true)
      setIsEditing(false)
      setSuccessMessage('Project submitted successfully! ✓')

      toast.success('Project submitted successfully ✅', { position: 'top-right', autoClose: 1000 })

      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (err) {
      console.error('Failed to submit project', err)
      setErrorMessage('Submission failed. Please try again.')
      toast.error('Submission failed ❌', { position: 'top-right', autoClose: 1000 })
    }
  }

  function handleEdit() {
    setIsEditing(true)
    setErrorMessage('')
    setSuccessMessage('')
  }

  function handleCancel() {
    const submission = loadSubmission(moduleSlug, projectSlug)
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

  function handleDelete() {
    if (confirm('Are you sure you want to remove this submission?')) {
      deleteSubmission(moduleSlug, projectSlug)
      setSubmitted(false)
      setIsEditing(false)
      setGithubUrl('')
      setLiveDemoUrl('')
      setErrorMessage('')
      setSuccessMessage('')
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="light" />
      <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-900">
            <FeatureIcon type="flag" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-950">Submit your project</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Share your GitHub repository and live demo link.
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
      {!allComplete && !submitted && (
        <div className="mt-4 rounded-2xl border border-red-200/70 bg-red-50/60 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-900">
            Action Required
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-800">
            Complete all <strong>{requirements.length}</strong> checklist items{' '}
            <strong>
              ({completedCount}/{requirements.length} done)
            </strong>{' '}
            before submitting.
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
              disabled={!allComplete && !submitted}
              className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-stone-500">
              Make sure your repository is public or accessible to reviewers.
            </p>
          </div>

          {/* Live Demo URL Input */}
          <div>
            <label htmlFor="demo-url" className="block text-sm font-semibold text-stone-900">
              Live Demo Link
            </label>
            <input
              id="demo-url"
              type="text"
              placeholder="https://my-project.vercel.app"
              value={liveDemoUrl}
              onChange={(e) => setLiveDemoUrl(e.target.value)}
              disabled={!allComplete && !submitted}
              className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-stone-500">
              Link to your deployed/live version (Vercel, Netlify, GitHub Pages, etc.)
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={!allComplete || isSubmitting}
              className="flex-1 rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed sm:flex-none"
            >
              {isSubmitting ? 'Submitting...' : submitted && !isEditing ? 'Update Submission' : 'Submit Project'}
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
              Live Demo
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
              className="flex-1 rounded-xl border border-red-300 px-6 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 sm:flex-none"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </section>
    </>
  )
}
