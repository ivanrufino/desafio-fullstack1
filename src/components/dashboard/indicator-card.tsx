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
    <Card className="border-none shadow-md">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm leading-snug text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4">
          <Icon className="size-6 text-slate-700" />
        </div>
      </CardContent>
    </Card>
  )
}