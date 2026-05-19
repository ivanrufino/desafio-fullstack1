import { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

interface Props {
  title: string
  value: string
  icon: LucideIcon
}

export function IndicatorCard({
  title,
  value,
  icon: Icon
}: Props) {
  return (
    <Card className="w-full min-w-0 border-none shadow-md">
      <CardContent className="flex items-center justify-between gap-4 p-4 sm:p-6">
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug text-slate-500">{title}</p>
          <h2 className="mt-2 break-words text-2xl font-bold sm:text-3xl">
            {value}
          </h2>
        </div>
        <div className="shrink-0 rounded-2xl bg-slate-100 p-3 sm:p-4">
          <Icon className="size-5 text-slate-700 sm:size-6" />
        </div>
      </CardContent>
    </Card>
  )
}
