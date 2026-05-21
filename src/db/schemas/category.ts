import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";


export const categories = pgTable('categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: varchar('slug', {length: 50}).notNull(),
    name: varchar('name', {length: 50}).notNull(),
    image: varchar('image', {length: 100}).notNull(),
})

export type Category = typeof categories.$inferSelect