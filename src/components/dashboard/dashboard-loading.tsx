import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardIndicatorsLoading() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="w-full border-none shadow-md">
          <CardContent className="flex items-center justify-between gap-4 p-4 sm:p-6">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-24" />
            </div>
            <Skeleton className="size-12 shrink-0 rounded-2xl sm:size-14" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function TopProceduresLoading() {
  return (
    <Card className="w-full border-none shadow-md">
      <CardContent className="space-y-4 p-4 sm:p-6">
        <Skeleton className="h-6 w-full max-w-xs" />
        <Skeleton className="h-4 w-full max-w-48" />
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </CardContent>
    </Card>
  )
}
