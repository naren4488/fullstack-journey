import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGetStateQuery, useUpdateTopicMutation } from '../api/baseApi'

// Sample topics for demonstration
const SAMPLE_TOPICS = [
  { id: 'topic-1', label: 'Variables and Data Types', moduleSlug: 'javascript-basics' },
  { id: 'topic-2', label: 'Functions and Scope', moduleSlug: 'javascript-basics' },
  { id: 'topic-3', label: 'Objects and Arrays', moduleSlug: 'javascript-basics' },
  { id: 'topic-4', label: 'CSS Selectors', moduleSlug: 'css-fundamentals' },
  { id: 'topic-5', label: 'Box Model', moduleSlug: 'css-fundamentals' },
]

const Home: React.FC = () => {
  const { data: stateData, error: stateError, isLoading: stateLoading } = useGetStateQuery()
  const [updateTopic] = useUpdateTopicMutation()
  const [updatingTopicIds, setUpdatingTopicIds] = useState<Set<string>>(new Set())
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set())

  // Debug toast check (remove after verification)
  React.useEffect(() => {
    toast.info('Debug: Toast system is active', {
      autoClose: 1000,
    })
  }, [])

  if (stateLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading state data...</p>
        </div>
      </div>
    )
  }

  if (stateError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-red-600">Error Loading Data</h2>
          <p className="text-gray-600">
            Failed to load state data from server. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const handleMarkComplete = async (topic: typeof SAMPLE_TOPICS[0]) => {
    try {
      setUpdatingTopicIds((prev) => new Set(prev).add(topic.id))
      const isCompleting = !completedTopics.has(topic.id)
      const actionLabel = isCompleting ? 'completed' : 'incomplete'

      // Call the mutation
      await updateTopic({
        moduleSlug: topic.moduleSlug,
        topicId: topic.id,
        completed: isCompleting,
      }).unwrap()

      // Update local state only on success
      setCompletedTopics((prev) => {
        const newSet = new Set(prev)
        if (isCompleting) {
          newSet.add(topic.id)
        } else {
          newSet.delete(topic.id)
        }
        return newSet
      })

      // Show success toast
      toast.success(`✓ Topic marked as ${actionLabel}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (error) {
      // Log error for debugging
      console.error('Failed to update topic:', error)

      // Extract error message
      let errorMessage = 'Failed to update topic. Please try again.'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'object' && error !== null && 'data' in error) {
        const errData = error as { data?: { message?: string } }
        errorMessage = errData.data?.message || 'Server error. Please try again.'
      }

      // Show error toast - UI state NOT updated, toggle prevented
      toast.error(`✗ ${errorMessage}`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      // Remove from updating set
      setUpdatingTopicIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(topic.id)
        return newSet
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">State Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Activity Section */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Streak</span>
                <span className="text-2xl font-bold text-blue-600">
                  {stateData?.activity?.currentStreak ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Activity</span>
                <span className="text-sm text-gray-800">
                  {stateData?.activity?.lastActivityAt
                    ? new Date(stateData.activity.lastActivityAt).toLocaleDateString()
                    : 'Never'}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Progress Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Modules Progress</span>
                <span className="text-sm font-medium">
                  {Object.keys(stateData?.modulesProgress ?? {}).length} entries
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Project Checks</span>
                <span className="text-sm font-medium">
                  {Object.keys(stateData?.projectRequirementChecks ?? {}).length} entries
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Project Submissions</span>
                <span className="text-sm font-medium">
                  {Object.keys(stateData?.projectSubmissions ?? {}).length} entries
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Module Submissions</span>
                <span className="text-sm font-medium">
                  {Object.keys(stateData?.moduleSubmissions ?? {}).length} entries
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Topics</h2>
          <div className="space-y-3">
            {SAMPLE_TOPICS.map((topic) => {
              const isUpdating = updatingTopicIds.has(topic.id)
              const isCompleted = completedTopics.has(topic.id)

              return (
                <div
                  key={topic.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{topic.label}</p>
                    <p className="text-xs text-gray-500">{topic.moduleSlug}</p>
                  </div>
                  <button
                    onClick={() => handleMarkComplete(topic)}
                    disabled={isUpdating || stateLoading}
                    className={`ml-4 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 disabled:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-100'
                    } ${isUpdating ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isUpdating ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                        Updating...
                      </span>
                    ) : isCompleted ? (
                      '✓ Completed'
                    ) : (
                      'Mark Complete'
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Raw Data Section */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Raw State Data</h2>
          <pre className="overflow-auto rounded bg-gray-100 p-4 text-sm">
            {JSON.stringify(stateData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Home