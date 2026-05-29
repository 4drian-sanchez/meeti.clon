import 'dotenv/config';
import { accounts, users } from "../../schemas";
import { drizzle } from "drizzle-orm/node-postgres";
import { authSeedData } from './data';

async function authSeeder() {
    const { mockAccounts, mockUsers } = await authSeedData()

    try {
        const db = drizzle(process.env.DB_URL!)
        await db.insert(users).values(mockUsers)
        await db.insert(accounts).values(mockAccounts)

        console.log('El seed de auth se ha ejecutado con exito')
        process.exit(0)
    } catch (error) {
        console.log('Hubo un error al ejecutar el seed de auth',error)
        process.exit(1)
    }
}

if(process.env.RUN_SEEDS === 'true') authSeeder()