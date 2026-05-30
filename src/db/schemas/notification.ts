import { pgTable, uuid, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";


export const notifications = pgTable('notifications', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('userId').notNull(),
    actorName: varchar('actor_name', {length: 100}).notNull(),
    message: varchar('message', {length: 100}).notNull(),
    target: varchar('target', {length: 100}).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    read: boolean('read').default(false)
})