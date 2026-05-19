export type ProcedureStatus = 'APROVADO' | 'REJEITADO'

export interface Procedure {
  id: string
  patient: string
  procedureName: string
  amount: number
  status: ProcedureStatus
  createdAt: string
}
