import { hashPassword } from "better-auth/crypto";
import type { AccountSeed, RawUser, UserSeed } from "../types";

export async function authSeedData() : Promise<{mockUsers: UserSeed[], mockAccounts: AccountSeed[]}> {

    const hashedPassword = await hashPassword('password123');

    const rawUsers: RawUser[] = [
      { name: "Adrian Sanchez", email: "adrian@example.com" },
        { name: "Alice Johnson", email: "alice@example.com" },
        { name: "Bob Smith", email: "bob@example.com" },
        { name: "Carlos Méndez", email: "carlos@example.com" },
        { name: "Diana Prince", email: "diana@example.com" },
        { name: "Evan Wright", email: "evan@example.com" },
    ];


    const mockUsers: UserSeed[] = [];
    const mockAccounts: AccountSeed[] = [];

    for (const {name, email} of rawUsers) {
        const userId = crypto.randomUUID();

        mockUsers.push({
            id: userId,
            name: name,
            email: email,
            emailVerified: true,
            image: null,
        })

        mockAccounts.push({
            id: crypto.randomUUID(),
            userId: userId,
            accountId: email,
            providerId: "credential",
            password: hashedPassword,
        });
    }

    return {
      mockUsers,
      mockAccounts
    }
}
