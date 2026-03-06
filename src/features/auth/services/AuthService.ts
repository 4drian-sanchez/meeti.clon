import { auth } from "@/src/lib/auth";
import { SignupInputs } from "../schemas/authSchemas";
import { authRepository, IAuthRepository } from './AuthRepository';

class AuthService {

    constructor(
        private readonly authRepository : IAuthRepository
    ){}

    async register ( credentials : SignupInputs ) {
        const { email, name, password } = credentials

        //Revisar si un usuario existe
        const user = await this.authRepository.userExists(email)
        if(user) {
            return {
                error: 'E-Mail no disponible, por favor intenta con otro',
                success: ''
            }
        }

        // Manejar el registro
        await auth.api.signUpEmail( {
            body: {
                email,
                name,
                password,
            }
        } )

        return {
            error: '',
            success: 'Cuenta creada correctamente. Revisa tu E-Mail'
        }
    }
}

export const authService = new AuthService(authRepository)