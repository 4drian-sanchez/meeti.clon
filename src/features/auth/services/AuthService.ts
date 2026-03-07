import { auth } from "@/src/lib/auth";
import { ForgotPassword, ResetPassword, SigninInputs, SignupInputs } from "../schemas/authSchemas";
import { authRepository, IAuthRepository } from './AuthRepository';
import { headers } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { AuthEmailService } from '../../../emails/services/AuthEmailServices';

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
                callbackURL: '/dashboard'
            },
            headers: await headers()
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

    async forgotPassword(credentials: ForgotPassword) {
        const user = await this.authRepository.userExists(credentials.email)

        if (!user) {
            return {
                error: 'El usuario no existe. Por favor intenta de nuevo',
                success: ''
            }
        }

        await auth.api.requestPasswordReset({
            body: {
                email: user.email
            }
        })

        return {
            error: '',
            success: 'Hemos enviado un Email con instruciones para cambiar tu contraseña'
        }
    }

    async resetPassword(newPassword: string, token: string) {

        try {
            await auth.api.resetPassword({
                body: {
                    newPassword,
                    token
                }
            })

            return {
                error: '',
                success: 'El reestablecido correctamente'
            }

        } catch (error) {
            if (error instanceof ApiError) {
                return {
                    error: 'Hubo un error. Token no válido',
                    success: ''
                }
            }

            return {
                error: 'Error interno en el servidor',
                success: ''
            }
        }
    }
}

export const authService = new AuthService(authRepository)