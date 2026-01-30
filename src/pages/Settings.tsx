import { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { AppDB } from '../store/appStore'
import { storage } from '../lib/storage'
import { t } from '../lib/i18n'

export default function Settings() {
  const initial = AppDB.getSettings()
  const [theme, setTheme] = useState(initial.theme)
  const [language, setLanguage] = useState(initial.language)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    AppDB.setSettings({ theme, language })
  }, [theme, language])

  const changeLanguage = (next: 'fr' | 'en') => {
    setLanguage(next)
    // force a reload so ALL screens update language consistently
    setTimeout(() => {
      window.location.href = '/'
    }, 0)
  }

  const reset = () => {
    if (!confirm('Tout effacer (progression, notes, favoris, sessions) ?')) return
    const keys = [
      'itilcoach:favorites',
      'itilcoach:notes',
      'itilcoach:progress',
      'itilcoach:sessions',
      'itilcoach:lastSessionId',
      'itilcoach:settings',
    ]
    keys.forEach(k => storage.remove(k))
    window.location.href = '/'
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="text-sm font-semibold">{t(language, 'settings_title')}</div>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800">
          <div>
            <div className="text-sm font-medium">{t(language, 'settings_theme')}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{t(language, 'settings_theme_sub')}</div>
          </div>
          <div className="flex gap-2">
            <Button variant={theme === 'light' ? 'primary' : 'secondary'} onClick={() => setTheme('light')}>{t(language, 'light')}</Button>
            <Button variant={theme === 'dark' ? 'primary' : 'secondary'} onClick={() => setTheme('dark')}>{t(language, 'dark')}</Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800">
          <div>
            <div className="text-sm font-medium">{t(language, 'settings_lang')}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{t(language, 'settings_lang_sub')}</div>
          </div>
          <div className="flex gap-2">
            <Button variant={language === 'fr' ? 'primary' : 'secondary'} onClick={() => changeLanguage('fr')}>FR</Button>
            <Button variant={language === 'en' ? 'primary' : 'secondary'} onClick={() => changeLanguage('en')}>EN</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800">
          <div className="text-sm font-medium">{t(language, 'settings_data')}</div>
          <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {t(language, 'settings_data_sub')}
          </div>
          <div className="mt-3">
            <Button variant="danger" onClick={reset}>{t(language, 'reset')}</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
