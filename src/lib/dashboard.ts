import { Procedure } from '@/types/procedure'

export interface ProcedureSummary {
  procedureName: string
  count: number
}

export function getTopProcedures(
  procedures: Procedure[],
  limit = 5
): ProcedureSummary[] {
  const counts = procedures.reduce<Record<string, number>>((acc, item) => {
    acc[item.procedureName] = (acc[item.procedureName] ?? 0) + 1
    return acc
  }, {})

  return Object.entries(counts)
    .map(([procedureName, count]) => ({ procedureName, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function getDashboardMetrics(procedures: Procedure[]) {
  const rejected = procedures.filter((item) => item.status === 'REJEITADO')
  const approved = procedures.filter((item) => item.status === 'APROVADO')

  return {
    totalExecuted: procedures.length,
    totalRejected: rejected.length,
    approvedAmount: approved.reduce((acc, item) => acc + item.amount, 0),
    rejectedAmount: rejected.reduce((acc, item) => acc + item.amount, 0),
    topProcedures: getTopProcedures(procedures)
  }
}
