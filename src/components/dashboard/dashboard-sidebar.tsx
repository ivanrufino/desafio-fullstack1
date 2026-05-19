'use client'

import { SidebarContent } from './sidebar-content'

export function DashboardSidebar() {
  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <SidebarContent />
    </aside>
  )
}
