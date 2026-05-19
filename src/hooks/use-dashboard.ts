'use client'

import { useEffect, useState } from 'react'

import { getDashboardData } from '@/services/dashboard.service'
import { Procedure } from '@/types/procedure'

export function useDashboard() {
  const [data, setData] = useState<Procedure[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setError(null)
        const response = await getDashboardData()
        setData(response)
      } catch {
        setError('Não foi possível carregar os dados do dashboard.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return {
    data,
    loading,
    error
  }
}
