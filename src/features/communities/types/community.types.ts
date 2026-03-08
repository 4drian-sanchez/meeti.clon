import { comunity } from "@/src/db/schemas"

export type InsertComunity = typeof comunity.$inferInsert
export type SelectComunity = typeof comunity.$inferSelect