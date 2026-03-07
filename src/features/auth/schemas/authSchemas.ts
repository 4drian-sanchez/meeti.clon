import z from 'zod'

const baseAuthSchema = z.object({
    name: z.string().trim().min(1, {error: 'EL nombre es obligatorio'}),
    email: z.email({error: 'El email no es válido'}),
    password: z.string().trim().min(8, 'El password debe ser mínimo 8 caracteres'),
    newPassword: z.string().trim().min(8, 'El password debe ser mínimo 8 caracteres'),
    passwordConfirmation: z.string().trim().min(1, {error: 'Confirma tu contraseña'})
})

export const signupSchema = baseAuthSchema.pick({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true
}).refine( (data) => {
   return data.password === data.passwordConfirmation
}, {error: 'Los passwords no son iguales', path: ['passwordConfirmation']})

export const signinSchema = baseAuthSchema.pick({
    email: true
}).extend({
    password: z.string().trim().min(1, 'Ingresa tu password'),
})

export const forgotPasswordSchema = baseAuthSchema.pick({
    email: true
})

export const resetPasswordSchema = baseAuthSchema.pick({
    newPassword: true,
    passwordConfirmation: true
}).refine( (data) => {
   return data.newPassword === data.passwordConfirmation
}, {error: 'Los passwords no son iguales', path: ['passwordConfirmation']})



export type SignupInputs = z.infer<typeof signupSchema>
export type SigninInputs = z.infer<typeof signinSchema>
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>
export type ResetPassword = z.infer<typeof resetPasswordSchema>
