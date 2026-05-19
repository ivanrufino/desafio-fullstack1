'use client'

import {
  BarChart3,
  Headphones,
  LayoutDashboard,
  Settings,
  Stethoscope
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { ProfileEditTrigger } from '@/components/profile/profile-edit-trigger'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { getUserInitials } from '@/lib/user'
import { useProfileUiStore } from '@/store/profile-ui.store'
import { useUserStore } from '@/store/user.store'

interface NavItem {
  label: string
  icon: LucideIcon
  active?: boolean
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Relatórios', icon: BarChart3 },
  { label: 'Configurações', icon: Settings },
  { label: 'Suporte', icon: Headphones }
]

interface SidebarContentProps {
  onNavigate?: () => void
}

function SidebarNavButton({
  label,
  icon: Icon,
  active,
  onNavigate
}: NavItem & { onNavigate?: () => void }) {
  const openProfile = useProfileUiStore((state) => state.open)

  if (label === 'Configurações') {
    return (
      <button
        type="button"
        onClick={() => {
          openProfile()
          onNavigate?.()
        }}
        className={cn(
          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
          'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        )}
      >
        <Icon className="size-5 shrink-0 text-slate-400" />
        {label}
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-teal-50 text-teal-800 ring-1 ring-teal-100'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      )}
    >
      <Icon
        className={cn(
          'size-5 shrink-0',
          active ? 'text-teal-600' : 'text-slate-400'
        )}
      />
      {label}
    </button>
  )
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const { name, email } = useUserStore()
  const initials = getUserInitials(name)

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
            <Stethoscope className="size-5" aria-hidden />
          </span>
          <span>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
              Hospital
            </p>
            <p className="text-lg font-bold leading-tight text-slate-800">
              MediCare
            </p>
          </span>
        </div>
      </header>

      <nav className="flex-1 space-y-1 px-4 py-2" aria-label="Menu principal">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>
        {navItems.map((item) => (
          <SidebarNavButton
            key={item.label}
            {...item}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <Separator />

      <footer className="p-4">
        <ProfileEditTrigger
          showIcon={false}
          onOpen={onNavigate}
          className="flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100 hover:bg-slate-100"
        >
          <Avatar size="lg">
            <AvatarFallback className="bg-teal-100 font-semibold text-teal-800">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {name}
            </p>
            <p className="truncate text-xs text-slate-500">{email}</p>
            <p className="mt-1 text-xs text-teal-600">Editar perfil</p>
          </span>
        </ProfileEditTrigger>
      </footer>
    </div>
  )
}
