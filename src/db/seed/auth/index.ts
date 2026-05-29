import 'dotenv/config'
import { hashPassword } from "better-auth/crypto";
import type { AccountSeed, RawUser, UserSeed } from './types'
import { accounts, users } from "../../schemas";
import { drizzle } from "drizzle-orm/node-postgres";


async function authSeeder() {

    const hashedPassword = await hashPassword('password123');

    const rawUsers: RawUser[] = [
        { name: "Alice Johnson", email: "alice@example.com" },
        { name: "Bob Smith", email: "bob@example.com" },
        { name: "Carlos Méndez", email: "carlos@example.com" },
        { name: "Diana Prince", email: "diana@example.com" },
        { name: "Evan Wright", email: "evan@example.com" },
        { name: "Adrian Sanchez", email: "adrian@example.com" },
    ];


    const mockUsers: UserSeed[] = [];
    const mockAccounts: AccountSeed[] = [];

    for (const u of rawUsers) {
        const userId = crypto.randomUUID();

        mockUsers.push({
            id: userId,
            name: u.name,
            email: u.email,
            emailVerified: true,
            image: null,
        })

        mockAccounts.push({
            id: crypto.randomUUID(),
            userId: userId,
            accountId: u.email,
            providerId: "credential",
            password: hashedPassword,
        });
    }

    //* Insertar en la DB
    try {

        const db = drizzle(process.env.DB_URL!)

        await db.insert(users).values(mockUsers)
        await db.insert(accounts).values(mockAccounts)
    } catch (error) {
        console.log(error)
    }
}

authSeeder()
