import { TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ProcedureSummary } from '@/lib/dashboard'

interface TopProceduresListProps {
  items: ProcedureSummary[]
}

export function TopProceduresList({ items }: TopProceduresListProps) {
  return (
    <Card className="w-full min-w-0 border-none shadow-md">
      <CardHeader className="flex flex-col gap-4 space-y-0 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Procedimentos mais executados
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Top 5 por quantidade de realizações
          </p>
        </div>
        <div className="rounded-2xl bg-teal-50 p-3">
          <TrendingUp className="size-5 text-teal-600" />
        </div>
      </CardHeader>
      <CardContent className="w-full px-0 pb-0">
        <Table className="w-full min-w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">#</TableHead>
              <TableHead>Procedimento</TableHead>
              <TableHead className="pr-6 text-right">Execuções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.procedureName}>
                <TableCell className="pl-6 font-medium text-slate-500">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-slate-800">
                  {item.procedureName}
                </TableCell>
                <TableCell className="pr-6 text-right tabular-nums text-slate-700">
                  {item.count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
