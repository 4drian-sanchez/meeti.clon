import { meeti, meetiLocations } from "@/src/db/schemas";
import type { SelectComunity } from "../../communities/types/community.types";
import type { Category } from "@/src/db/schemas/category";
import { User } from "better-auth";

export type InsertBasicMeeti = typeof meeti.$inferInsert
export type InsertMeetiLocation = typeof meetiLocations.$inferInsert

export type SelectBasicMeeti = typeof meeti.$inferSelect
export type SelectMeetiLocation = typeof meetiLocations.$inferSelect

export type InsertMeeti = InsertBasicMeeti & {
    location? : Omit<InsertMeetiLocation, 'meetiId' | 'id'>
}


export type SelectMeeti = SelectBasicMeeti & {
    location?: SelectMeetiLocation | null
}

export type FullMeeti = SelectBasicMeeti & {
    location?: SelectMeetiLocation | null
    community : SelectComunity
    category: Category
    admin: User
}