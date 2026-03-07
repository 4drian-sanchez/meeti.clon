import { auth } from "@/src/lib/auth";
import { SigninInputs, SignupInputs } from "../schemas/authSchemas";
import { authRepository, IAuthRepository } from './AuthRepository';
import { headers } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";

class AuthService {

    constructor(
        private readonly authRepository: IAuthRepository
    ) { }

    async register(credentials: SignupInputs) {
        const { email, name, password } = credentials

        //Revisar si un usuario existe
        const user = await this.authRepository.userExists(email)
        if (user) {
            return {
                error: 'E-Mail no disponible, por favor intenta con otro',
                success: ''
            }
        }

        // Manejar el registro
        await auth.api.signUpEmail({
            body: {
                email,
                name,
                password,
            }
        })

        return {
            error: '',
            success: 'Cuenta creada correctamente. Revisa tu E-Mail'
        }
    }

    async login(credentials: SigninInputs) {
        const { email, password } = credentials

        //Revisar si un usuario existe
        const user = await this.authRepository.userExists(email)
        if (!user) {
            return {
                error: 'El usuario no existe.',
                success: ''
            }
        }

        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    callbackURL: '/dashboard'
                },
                headers: await headers()
            })

            return {
                error: '',
                success: 'Sesión iniciada correctamente'
            }
        }
        catch (error) {
            //* Password incorrecto
            if ((error as ApiError).statusCode === 401) {
                return {
                    error: 'Password incorrecto',
                    success: ''
                }
            }

            //* Cuenta no confirmada
            if ((error as ApiError).statusCode === 403) {
                return {
                    error: 'Tu cuenta no ha sido confirmada. Te enviamos enviado un email de confirmación',
                    success: ''
                }
            }
            return {
                error: 'Error interno',
                success: ''
            }
        }
    }
}

export const authService = new AuthService(authRepository)