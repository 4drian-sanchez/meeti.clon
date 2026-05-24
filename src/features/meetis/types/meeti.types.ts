import { meeti, meetiLocations } from "@/src/db/schemas";

export type InsertBasicMeeti = typeof meeti.$inferInsert
export type InsertBasicLocation = typeof meetiLocations.$inferInsert

export type SelectBasicMeeti = typeof meeti.$inferSelect
export type SelectBasicLocation = typeof meeti.$inferSelect

export type InsertMeeti = InsertBasicMeeti & {
    location? : Omit<InsertBasicLocation, 'meetiId' | 'id'>
}


export type SelectMeeti = SelectBasicMeeti & {
    location?: SelectBasicLocation
}