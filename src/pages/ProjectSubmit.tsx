import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSubmitProjectMutation } from '../api/baseApi'

const ProjectSubmit: React.FC = () => {
  const [githubUrl, setGithubUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [submitProject, { isLoading }] = useSubmitProjectMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await submitProject({
        moduleSlug: 'default-module',
        projectSlug: 'default-project',
        githubUrl: githubUrl.trim(),
        liveUrl: liveUrl.trim(),
      }).unwrap()

      toast.success('Project submitted successfully ✅')
      setGithubUrl('')
      setLiveUrl('')
    } catch (error) {
      console.error('Submit project error:', error)
      toast.error('Submission failed ❌')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto w-full max-w-lg rounded-xl border border-stone-200 bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-stone-900">Submit Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-800" htmlFor="githubUrl">
              GitHub URL
            </label>
            <input
              id="githubUrl"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
              className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-800" htmlFor="liveUrl">
              Live URL
            </label>
            <input
              id="liveUrl"
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              required
              className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isLoading ? 'Submitting...' : 'Submit Project'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProjectSubmit
