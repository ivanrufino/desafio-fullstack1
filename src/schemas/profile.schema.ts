import { z } from 'zod'

const nameSchema = z
  .string()
  .trim()
  .min(3, 'Nome deve ter no mínimo 3 caracteres')
  .max(30, 'Nome deve ter no máximo 30 caracteres')
  .regex(/^[A-Za-zÀ-ÿ\s.\`´`~^çÇ'-]+$/, 'Use letras, espaços ou caracteres especiais permitidos (ex: . ` ´ ~ ^ -)')

const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter entre 8 e 12 caracteres')
  .max(12, 'Senha deve ter entre 8 e 12 caracteres')
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d).*$/,
    'Senha deve conter letras e números (ex: senha123)'
  )

export const profileSchema = z
  .object({
    name: nameSchema,
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
  })
  .superRefine((data, ctx) => {
    const changingPassword =
      data.password.length > 0 || data.confirmPassword.length > 0

    if (!changingPassword) return

    const passwordResult = passwordSchema.safeParse(data.password)
    if (!passwordResult.success) {
      passwordResult.error.issues.forEach((issue) => {
        ctx.addIssue({ ...issue, path: ['password'] })
      })
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'As senhas precisam coincidir'
      })
    }
  })

export type ProfileSchema = z.infer<typeof profileSchema>
