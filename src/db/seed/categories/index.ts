import 'dotenv/config'
import { drizzle } from "drizzle-orm/node-postgres";
import { categories } from "../../schemas";
import { categoriesSeed } from './data/categories';

async function CategoriesSeeder() {

    try {
        const db = drizzle(process.env.DB_URL!)
        await db.insert( categories ).values( categoriesSeed )
        console.log('El seed de categorias se ha ejecutado con exito')
        process.exit(0)
        
    } catch (error) {
        console.log('Hubo un error al ejecutar el seed de categorias: ', error)
        process.exit(1)
    }
}

if( process.env.RUN_SEEDS === 'true' ) CategoriesSeeder()