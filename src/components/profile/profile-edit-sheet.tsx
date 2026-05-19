'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import {
  profileSchema,
  type ProfileSchema
} from '@/schemas/profile.schema'
import { useProfileUiStore } from '@/store/profile-ui.store'
import { useUserStore } from '@/store/user.store'

export function ProfileEditSheet() {
  const { isOpen, close } = useProfileUiStore()
  const { name, email, updateProfile } = useUserStore()

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name,
      email,
      password: '',
      confirmPassword: ''
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = form

  useEffect(() => {
    if (isOpen) {
      reset({
        name,
        email,
        password: '',
        confirmPassword: ''
      })
    }
  }, [isOpen, name, email, reset])

  function onSubmit(values: ProfileSchema) {
    updateProfile({
      name: values.name.trim(),
      ...(values.password ? { password: values.password } : {})
    })

    toast.success('Perfil atualizado com sucesso')
    close()
    reset({
      name: values.name.trim(),
      email: values.email,
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Editar perfil</SheetTitle>
          <SheetDescription>
            Alterações são aplicadas imediatamente no dashboard.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 pb-6"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              readOnly
              disabled
              className="cursor-not-allowed opacity-70"
              {...register('email')}
            />
            <p className="text-xs text-muted-foreground">
              O e-mail não pode ser alterado.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Nova senha</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Deixe em branco para manter a atual"
              aria-invalid={!!errors.password}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Entre 8 e 12 caracteres, com letras e números.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a nova senha"
              aria-invalid={!!errors.confirmPassword}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <SheetFooter className="mt-auto flex-row gap-2 p-0">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={close}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
