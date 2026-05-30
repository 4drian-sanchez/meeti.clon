import { notifications } from "@/src/db/schemas";

export type InsertNotification = typeof notifications.$inferInsert
export type SelectNotification = typeof notifications.$inferSelect