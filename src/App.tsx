import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { modules as initialModules, type Module } from './data/modules'
import { PracticeProjectDetailsPage } from './features/practice-projects/PracticeProjectDetailsPage'
import {
  JOURNEY_MODULES_STORAGE_KEY,
  mergeStoredProgress,
} from './lib/journeyStorage'
import { updateLastActivity } from './lib/smartNotifications'

function applyStateTopicProgress(
  modules: Module[],
  modulesProgress: Record<string, unknown>,
): Module[] {
  if (!modulesProgress || typeof modulesProgress !== 'object') return modules

  const normalized = modules.map((module) => {
    const moduleProgress = modulesProgress[module.slug]
    const doneMap = new Map<string, boolean>()

    if (moduleProgress && typeof moduleProgress === 'object' && !Array.isArray(moduleProgress)) {
      for (const [topicLabel, value] of Object.entries(moduleProgress)) {
        if (typeof value === 'boolean') {
          doneMap.set(topicLabel, value)
        } else if (value === 'true') {
          doneMap.set(topicLabel, true)
        } else if (value === 'false') {
          doneMap.set(topicLabel, false)
        }
      }
    }

    for (const [key, value] of Object.entries(modulesProgress)) {
      if (key === module.slug) continue

      const separators = ['/', ':', '-', '|', '_']
      for (const sep of separators) {
        const prefix = `${module.slug}${sep}`
        if (key.startsWith(prefix)) {
          const topicLabel = key.slice(prefix.length)
          if (!topicLabel) continue
          if (typeof value === 'boolean') {
            doneMap.set(topicLabel, value)
          } else if (value === 'true') {
            doneMap.set(topicLabel, true)
          } else if (value === 'false') {
            doneMap.set(topicLabel, false)
          }
        }
      }
    }

    if (doneMap.size === 0) {
      return module
    }

    return {
      ...module,
      topics: module.topics.map((topic) => {
        if (!doneMap.has(topic.label)) {
          return topic
        }
        return { ...topic, done: doneMap.get(topic.label) ?? topic.done }
      }),
    }
  })

  return normalized
}

import { DashboardPage } from './pages/DashboardPage'
import { ModuleDetailsPage } from './pages/ModuleDetailsPage'
import { ModuleQuizPage } from './pages/ModuleQuizPage'
import { ProjectsPage } from './pages/ProjectsPage'
import Home from './pages/Home'
import ProjectSubmit from './pages/ProjectSubmit'
import { useGetStateQuery } from './api/baseApi'

function App() {
  const { data: stateData, error: stateError, isLoading: stateLoading } = useGetStateQuery()

  // Local topic completion overrides
  const [localTopicChanges, setLocalTopicChanges] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {}
    const stored = window.localStorage.getItem('local-topic-changes')
    return stored ? JSON.parse(stored) : {}
  })

  // Compute merged modules from canonical + API + local data + local changes
  const modules = useMemo(() => {
    let baseModules = initialModules

    if (typeof window !== 'undefined') {
      baseModules = mergeStoredProgress(
        initialModules,
        window.localStorage.getItem(JOURNEY_MODULES_STORAGE_KEY),
      )
    }

    if (stateData && stateData.modulesProgress) {
      baseModules = applyStateTopicProgress(baseModules, stateData.modulesProgress)
    }

    // Apply local topic changes last (user overrides)
    return baseModules.map((mod) => ({
      ...mod,
      topics: mod.topics.map((topic) => {
        const topicKey = `${mod.slug}-${topic.label}`
        const localOverride = localTopicChanges[topicKey]
        return {
          ...topic,
          done: localOverride !== undefined ? localOverride : topic.done,
        }
      }),
    }))
  }, [localTopicChanges, stateData])

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!stateLoading && stateError) {
      console.error('[STATE API ERROR] Failed to load state from server:', stateError)
      console.info('[STATE API FALLBACK] Using local module data and default state')
    } else if (stateData) {
      console.info('[STATE API SUCCESS] Loaded state data:', {
        hasModulesProgress: Object.keys(stateData.modulesProgress).length > 0,
        hasProjectChecks: Object.keys(stateData.projectRequirementChecks).length > 0,
        currentStreak: stateData.activity.currentStreak,
        lastActivity: stateData.activity.lastActivityAt,
      })
    }
  }, [stateError, stateLoading, stateData])

  useEffect(() => {
    window.localStorage.setItem(
      JOURNEY_MODULES_STORAGE_KEY,
      JSON.stringify(modules),
    )
  }, [modules])

  useEffect(() => {
    window.localStorage.setItem('local-topic-changes', JSON.stringify(localTopicChanges))
  }, [localTopicChanges])

  function handleToggleTopic(slug: string, topicLabel: string) {
    const topicKey = `${slug}-${topicLabel}`
    setLocalTopicChanges((prev) => ({
      ...prev,
      [topicKey]: !prev[topicKey], // Toggle the local override
    }))
    // Track activity when user completes a topic
    updateLastActivity().catch((err) => console.warn('[ACTIVITY TOUCH] failed', err))
  }

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 1000 }} />
      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              modules={modules}
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
            />
          }
        />
        <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/submit-project" element={<ProjectSubmit />} />
      <Route
        path="/modules/:moduleSlug/projects/:projectSlug"
        element={<PracticeProjectDetailsPage />}
      />
      <Route path="/modules/:moduleSlug/quiz" element={<ModuleQuizPage />} />
      <Route
        path="/modules/:slug"
        element={
          <ModuleDetailsPage
            modules={modules}
            onToggleTopic={handleToggleTopic}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}

export default App
