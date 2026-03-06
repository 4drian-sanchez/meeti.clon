"use server"

import { SignupInputs, signupSchema } from "../schemas/authSchemas";
import { authService } from "../services/AuthService";

export async function signupAction( inputs : SignupInputs ) {

    const validateInputs = signupSchema.safeParse( inputs )
    if( !validateInputs.success ) {
        return {
            error: 'hubo un error',
            success: ''
        }
    }

    const { data } = validateInputs

    const response = await authService.register(data)
    return response
}