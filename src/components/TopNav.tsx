import { Link, NavLink, useLocation } from 'react-router-dom'
import { BarChart3, Home, Settings, Star } from 'lucide-react'
import { cn } from '../lib/utils'
import { AppDB } from '../store/appStore'
import { t } from '../lib/i18n'

const items = [
  { to: '/', key: 'nav_home', icon: Home },
  { to: '/favorites', key: 'nav_favorites', icon: Star },
  { to: '/stats', key: 'nav_stats', icon: BarChart3 },
  { to: '/settings', key: 'nav_settings', icon: Settings },
] as const

export function TopNav() {
  const loc = useLocation()
  const isSession = loc.pathname.startsWith('/session') || loc.pathname.startsWith('/results')
  const settings = AppDB.getSettings()
  const lang = settings.language

  const setLang = (next: 'fr' | 'en') => {
    AppDB.setSettings({ ...settings, language: next })
    // Reload to avoid half-updated UI without a global state manager
    window.location.href = loc.pathname + loc.search
  }
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">I</span>
          <span className="hidden sm:inline">{t(lang, 'brand')}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Language (disabled during session/results to keep sessions consistent) */}
          <div className={cn('inline-flex rounded-xl border border-zinc-200 bg-white p-1 text-sm dark:border-zinc-800 dark:bg-zinc-950', isSession && 'opacity-60 pointer-events-none')}>
            <button
              type="button"
              onClick={() => setLang('fr')}
              className={cn('rounded-lg px-2 py-1', lang === 'fr' && 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900')}
              aria-label="FR"
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={cn('rounded-lg px-2 py-1', lang === 'en' && 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900')}
              aria-label="EN"
            >
              EN
            </button>
          </div>

          <nav className={cn('flex items-center gap-1', isSession && 'opacity-60 pointer-events-none')}>
          {items.map(({ to, key, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900',
                  isActive && 'bg-zinc-100 dark:bg-zinc-900',
                )
              }
              aria-label={t(lang, key as any)}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{t(lang, key as any)}</span>
            </NavLink>
          ))}
        </nav>
        </div>
      </div>
    </header>
  )
}
