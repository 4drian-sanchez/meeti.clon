import {betterAuth} from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { db } from '../db'
import { AuthEmailService } from '../emails/services/AuthEmailServices';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        usePlural: true
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignIn: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({user, url}) => {
            const { email, name } = user
            await AuthEmailService.SendEmailVerification({ email, name, url})
        }
    },

    plugins: [nextCookies()]
})