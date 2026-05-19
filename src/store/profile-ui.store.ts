import { create } from 'zustand'

interface ProfileUiState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useProfileUiStore = create<ProfileUiState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))
