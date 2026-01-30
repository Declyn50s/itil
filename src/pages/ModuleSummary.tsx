import { Link, useParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { getModulesByLang } from '../data/modules'
import { getModuleSummary } from '../data/summaries'
import { AppDB } from '../store/appStore'
import { t } from '../lib/i18n'
import type { ModuleId } from '../types'

function Badge({ children, tone }: { children: React.ReactNode; tone: 'info'|'note'|'success'|'danger' }) {
  const map: Record<string, string> = {
    info: 'border-cyan-200 bg-cyan-50 text-cyan-900 dark:border-cyan-900/40 dark:bg-cyan-950/30 dark:text-cyan-100',
    note: 'border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-100',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100',
    danger: 'border-red-200 bg-red-50 text-red-900 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-100',
  }
  return <div className={'rounded-2xl border p-3 text-sm ' + map[tone]}>{children}</div>
}

export default function ModuleSummary() {
  const { id } = useParams()
  const moduleId = (id ?? 'M2') as ModuleId
  const lang = AppDB.getSettings().language
  const mod = getModulesByLang(lang).find(m => m.id === moduleId)
  const summary = getModuleSummary(lang, moduleId)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">{t(lang, 'summary_kicker')}</div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {mod ? `${mod.title} — ${mod.subtitle}` : t(lang, 'summary_title')}
          </h1>
        </div>
        <div className="flex gap-2">
          <Link to={`/session/new?module=${moduleId}`}><Button className="gap-2">{t(lang, 'summary_start')}</Button></Link>
          <Link to="/"><Button variant="secondary" className="gap-2">{t(lang, 'summary_back_home')}</Button></Link>
        </div>
      </div>

      <Card className="space-y-2">
        <div className="text-sm font-semibold">{t(lang, 'summary_objective')}</div>
        <p className="text-sm text-zinc-700 dark:text-zinc-200">
          {summary?.objective ?? t(lang, 'summary_unavailable')}
        </p>
      </Card>

      {summary ? (
        <>
          {summary.sections.map((s, idx) => (
            <Card key={idx} className="space-y-3">
              <div className="font-semibold">{s.title}</div>

              {s.blocks.map((b, bi) => {
                if (b.type === 'definition') {
                  return (
                    <div key={bi} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
                      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{b.label}</div>
                      <div className="mt-1 text-zinc-900 dark:text-zinc-50">{b.text}</div>
                    </div>
                  )
                }
                if (b.type === 'callout') {
                  return <Badge key={bi} tone={b.tone}>{b.text}</Badge>
                }
                if (b.type === 'list') {
                  return (
                    <ul key={bi} className="list-disc space-y-1 pl-5 text-sm text-zinc-800 dark:text-zinc-200">
                      {b.items.map((it, i) => <li key={i}>{it}</li>)}
                    </ul>
                  )
                }
                if (b.type === 'table') {
                  return (
                    <div key={bi} className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                            {b.headers.map((h, i) => <th key={i} className="py-2 pr-4">{h}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {b.rows.map((r, ri) => (
                            <tr key={ri} className="border-b border-zinc-100 dark:border-zinc-900">
                              {r.map((cell, ci) => <td key={ci} className="py-2 pr-4 align-top text-zinc-800 dark:text-zinc-200">{cell}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                }
                if (b.type === 'twoCols') {
                  return (
                    <div key={bi} className="grid gap-2 md:grid-cols-2">
                      <div className="rounded-2xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{b.leftTitle}</div>
                        <div className="mt-1 text-zinc-800 dark:text-zinc-200">{b.leftText}</div>
                      </div>
                      <div className="rounded-2xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{b.rightTitle}</div>
                        <div className="mt-1 text-zinc-800 dark:text-zinc-200">{b.rightText}</div>
                      </div>
                    </div>
                  )
                }
                return null
              })}
            </Card>
          ))}

          {summary.takeaways.length > 0 && (
            <Card className="space-y-2">
              <div className="font-semibold">{t(lang, 'summary_takeaways')}</div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-800 dark:text-zinc-200">
                {summary.takeaways.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <div className="text-sm text-zinc-700 dark:text-zinc-200">{t(lang, 'summary_unavailable')}</div>
          <div className="mt-3">
            <Link to="/"><Button variant="secondary">{t(lang, 'summary_back_home')}</Button></Link>
          </div>
        </Card>
      )}
    </div>
  )
}
