import { drizzle } from "drizzle-orm/node-postgres";
import { categories } from "../schemas";
import { categoriesSeed } from './data/categories';
import 'dotenv/config'


async function seed() {
    const db = drizzle(process.env.DB_URL!)
    await db.insert( categories ).values( categoriesSeed )
    console.log('Datos insertados en la DB')
}

seed()