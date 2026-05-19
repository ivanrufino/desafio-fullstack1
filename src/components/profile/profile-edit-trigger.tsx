'use client'

import { Pencil } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { useProfileUiStore } from '@/store/profile-ui.store'

interface ProfileEditTriggerProps {
  children?: ReactNode
  className?: string
  showIcon?: boolean
  onOpen?: () => void
}

export function ProfileEditTrigger({
  children,
  className,
  showIcon = true,
  onOpen
}: ProfileEditTriggerProps) {
  const openProfile = useProfileUiStore((state) => state.open)

  return (
    <button
      type="button"
      onClick={() => {
        openProfile()
        onOpen?.()
      }}
      className={cn(
        'text-left transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
      {showIcon && !children && (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700">
          <Pencil className="size-4" />
          Editar perfil
        </span>
      )}
    </button>
  )
}
