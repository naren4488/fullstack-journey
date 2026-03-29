import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { modules as initialModules, type Module } from './data/modules'
import { PracticeProjectDetailsPage } from './features/practice-projects/PracticeProjectDetailsPage'
import {
  JOURNEY_MODULES_STORAGE_KEY,
  mergeStoredProgress,
} from './lib/journeyStorage'
import { DashboardPage } from './pages/DashboardPage'
import { ModuleDetailsPage } from './pages/ModuleDetailsPage'
import { ModuleQuizPage } from './pages/ModuleQuizPage'
import { ProjectsPage } from './pages/ProjectsPage'

function App() {
  const [modules, setModules] = useState<Module[]>(() => {
    if (typeof window === 'undefined') {
      return initialModules
    }
    return mergeStoredProgress(
      initialModules,
      window.localStorage.getItem(JOURNEY_MODULES_STORAGE_KEY),
    )
  })

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    window.localStorage.setItem(
      JOURNEY_MODULES_STORAGE_KEY,
      JSON.stringify(modules),
    )
  }, [modules])

  function handleToggleTopic(slug: string, topicLabel: string) {
    setModules((currentModules) =>
      currentModules.map((module) =>
        module.slug === slug
          ? {
              ...module,
              topics: module.topics.map((topic) =>
                topic.label === topicLabel
                  ? { ...topic, done: !topic.done }
                  : topic,
              ),
            }
          : module,
      ),
    )
  }

  return (
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
  )
}

export default App
