'use client'

import { Activity, CircleX, Wallet, WalletCards } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useDashboard } from '@/hooks/use-dashboard'
import { getDashboardMetrics } from '@/lib/dashboard'
import { formatCurrency } from '@/lib/formatters'
import { getUserInitials } from '@/lib/user'
import { useUserStore } from '@/store/user.store'

import { ProfileEditSheet } from '@/components/profile/profile-edit-sheet'
import { ProfileEditTrigger } from '@/components/profile/profile-edit-trigger'

import {
  DashboardIndicatorsLoading,
  TopProceduresLoading
} from './dashboard-loading'
import { DashboardSidebar } from './dashboard-sidebar'
import { IndicatorCard } from './indicator-card'
import { MobileSidebar } from './mobile-sidebar'
import { TopProceduresList } from './top-procedures-list'

export function DashboardPage() {
  const { data, loading, error } = useDashboard()
  const { name, email } = useUserStore()
  const initials = getUserInitials(name)

  const metrics = getDashboardMetrics(data)

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <ProfileEditSheet />
      <DashboardSidebar />

      <div className="flex min-w-0 w-full flex-1 flex-col">
        <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <MobileSidebar />

            <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
                  Dashboard Hospitalar
                </h1>
                <p className="text-sm text-slate-500">
                  Gestão financeira de procedimentos
                </p>
              </div>

              <ProfileEditTrigger className="flex w-full min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 hover:bg-slate-100 sm:w-auto">
                <Avatar className="shrink-0">
                  <AvatarFallback className="bg-teal-100 text-sm font-semibold text-teal-800">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 sm:text-left">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {name}
                  </p>
                  <p className="truncate text-xs text-slate-500">{email}</p>
                  <p className="mt-0.5 text-xs text-teal-600">Editar perfil</p>
                </div>
              </ProfileEditTrigger>
            </div>
          </div>
        </header>

        <main className="w-full flex-1 space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
          <section className="w-full" aria-labelledby="indicators-heading">
            <h2
              id="indicators-heading"
              className="mb-4 text-lg font-semibold text-slate-800 sm:mb-6"
            >
              Balanço
            </h2>

            {loading ? (
              <DashboardIndicatorsLoading />
            ) : error ? (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            ) : (
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                <IndicatorCard
                  title="Total de procedimentos executados"
                  value={String(metrics.totalExecuted)}
                  icon={Activity}
                />
                <IndicatorCard
                  title="Total de procedimentos rejeitados"
                  value={String(metrics.totalRejected)}
                  icon={CircleX}
                />
                <IndicatorCard
                  title="Total aprovado (valor em reais)"
                  value={formatCurrency(metrics.approvedAmount)}
                  icon={Wallet}
                />
                <IndicatorCard
                  title="Total rejeitado (valor em reais)"
                  value={formatCurrency(metrics.rejectedAmount)}
                  icon={WalletCards}
                />
              </div>
            )}
          </section>

          <section className="w-full" aria-labelledby="top-procedures-heading">
            <h2 id="top-procedures-heading" className="sr-only">
              Procedimentos mais executados
            </h2>

            {loading ? (
              <TopProceduresLoading />
            ) : !error ? (
              <TopProceduresList items={metrics.topProcedures} />
            ) : null}
          </section>
        </main>
      </div>
    </div>
  )
}
