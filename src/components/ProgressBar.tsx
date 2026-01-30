import { cn, clamp } from '../lib/utils'

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const v = clamp(value, 0, 100)
  return (
    <div className={cn('h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-900', className)}>
      <div className="h-2 rounded-full bg-zinc-900 dark:bg-white" style={{ width: `${v}%` }} />
    </div>
  )
}
