"use server"

import { ResetPassword, resetPasswordSchema } from "../schemas/authSchemas";
import { authService } from "../services/AuthService";

export async function ResetPasswordAction( credentials : ResetPassword, token: string ) {

    const validateData = resetPasswordSchema.safeParse(credentials)

    if(!validateData.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const { newPassword } = validateData.data

    const resetPasswordResponse = await authService.resetPassword(newPassword, token)
    return resetPasswordResponse

}