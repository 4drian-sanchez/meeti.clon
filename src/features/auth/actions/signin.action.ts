"use server"

import { SigninInputs, signinSchema } from "../schemas/authSchemas";
import { authService } from "../services/AuthService";

export async function signinAction( inputs : SigninInputs ) {

    const validateInputs = signinSchema.safeParse( inputs )
    if( !validateInputs.success ) {
        return {
            error: 'hubo un error',
            success: ''
        }
    }

    const { data } = validateInputs

    const response = await authService.login(data)
    return response
}