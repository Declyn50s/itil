import type { ModuleId } from '../types'
import { MODULES } from '../data/modules'
import { cn } from '../lib/utils'

export function ModuleChips({ modules, className }: { modules: ModuleId[]; className?: string }) {
  const label = (id: ModuleId) => MODULES.find(m => m.id === id)?.title ?? id
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {modules.map(m => (
        <span key={m} className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:text-zinc-200">
          {label(m)}
        </span>
      ))}
    </div>
  )
}
