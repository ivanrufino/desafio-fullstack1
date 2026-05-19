import { Procedure } from '@/types/procedure'

const API_URL = '/api/procedimentos'

export async function getDashboardData(): Promise<Procedure[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Falha ao carregar procedimentos')
  }

  return response.json() as Promise<Procedure[]>
}
