import { drizzle } from 'drizzle-orm/node-postgres'
import { relations } from './relations/index';
import * as schema from './schemas'

export const db = drizzle( process.env.DB_URL!, {
    schema,
    relations
})