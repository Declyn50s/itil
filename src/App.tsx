import { Routes, Route, Navigate } from 'react-router-dom'
import { TopNav } from './components/TopNav'
import Home from './pages/Home'
import NewSession from './pages/NewSession'
import SessionRunner from './pages/SessionRunner'
import Results from './pages/Results'
import Favorites from './pages/Favorites'
import Stats from './pages/Stats'
import Settings from './pages/Settings'
import ModuleSummary from './pages/ModuleSummary'
import { useEffect } from 'react'
import { AppDB } from './store/appStore'

export default function App() {
  useEffect(() => {
    const s = AppDB.getSettings()
    document.documentElement.classList.toggle('dark', s.theme === 'dark')
  }, [])

  return (
    <div className="min-h-full">
      <TopNav />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/session/new" element={<NewSession />} />
          <Route path="/session/:id" element={<SessionRunner />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/module/:id/summary" element={<ModuleSummary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
