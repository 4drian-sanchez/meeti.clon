import { NotificationSchema } from "@/src/db/schemas";

export type InsertNotification = typeof NotificationSchema.$inferInsert
export type SelectNotification = typeof NotificationSchema.$inferSelect