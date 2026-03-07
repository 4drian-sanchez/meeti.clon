import { emailConfig } from "../config/config";
import { renderPasswordResetEmail, renderPasswordResetEmailText } from "../templates/PasswordResetEmail";
import { renderVerificationEmail, renderVerificationEmailText } from "../templates/verificationEmail";
import { PasswordResetEmailData, VerificationEmailData } from "../types/email.types";
import { EmailService } from "./EmailService";


export class AuthEmailService {

    static async SendEmailVerification( data : VerificationEmailData ) : Promise<void> {
        await EmailService.send({
            from: emailConfig.from.verification,
            to: data.email,
            subject: 'Meeti - Confirma tu cuenta',
            text: renderVerificationEmailText(data),
            html: renderVerificationEmail(data)
        })
    }

    static async sendResetPassword( data : PasswordResetEmailData ) : Promise<void> {
        await EmailService.send({
            from: emailConfig.from.passwordReset,
            to: data.email,
            subject: 'Meeti - Cambia tu contraseña',
            text: renderPasswordResetEmailText(data),
            html: renderPasswordResetEmail(data)
        })
    }
}