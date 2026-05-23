import { db } from "@/src/db"
import { InsertMeeti } from "../types/meeti.types"
import { meeti } from "@/src/db/schemas"

export interface IMeetiRepository {
    insert(data: InsertMeeti): Promise<void>
}

class MeetiRepository implements IMeetiRepository {
    async insert(data: InsertMeeti): Promise<void> {
        const [ insertMeeti ] = await db.insert(meeti).values(data).returning()
        console.log(insertMeeti)
    }
}

export const meetiRepository = new MeetiRepository()