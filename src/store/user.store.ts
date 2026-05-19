import { create } from 'zustand'

interface UpdateProfileInput {
  name: string
  password?: string
}

interface UserState {
  name: string
  email: string
  password: string
  updateProfile: (data: UpdateProfileInput) => void
}

export const useUserStore = create<UserState>((set) => ({
  name: 'Ivan Rufino Martins',
  email: 'ivan.rufino.martins@gmail.com',
  password: 'senha123',

  updateProfile: ({ name, password }) =>
    set((state) => ({
      name,
      ...(password ? { password } : {})
    }))
}))
