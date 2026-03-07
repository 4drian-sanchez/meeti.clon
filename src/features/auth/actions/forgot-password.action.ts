"use server"

import { ForgotPassword, forgotPasswordSchema } from "../schemas/authSchemas";
import { authService } from "../services/AuthService";

export async function forgotPasswordAction( credentials : ForgotPassword ) {
    const validateData = forgotPasswordSchema.safeParse(credentials)

    if(!validateData.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const { data } = validateData

    const response = await authService.forgotPassword(data)
    return response
}