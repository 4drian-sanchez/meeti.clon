import { db } from "@/src/db"
import { InsertMeeti, SelectMeeti } from "../types/meeti.types"
import { meeti, meetiLocations } from "@/src/db/schemas"
import { format } from "date-fns"

export interface IMeetiRepository {
    insert(data: InsertMeeti): Promise<void>
    getUpcomingByUserId(userId : string) : Promise<SelectMeeti[]>
    getMeetiById(meetiId: string) : Promise<SelectMeeti | null>
}

class MeetiRepository implements IMeetiRepository {
    async insert(data: InsertMeeti): Promise<void> {
        const [ insertMeeti ] = await db.insert(meeti).values(data).returning()
        
        if( !data.virtual && data.location ) {
            await db.insert(meetiLocations).values({
              meetiId: insertMeeti.id,
              ...data.location
            })
        }
    }

    async getUpcomingByUserId(userId: string) : Promise<SelectMeeti[]>{
        
        const date = format(new Date(), 'yyy-MM-dd')

        const meetiByUserId = await db.query.meeti.findMany({
            where: {
                AND: [
                    { createdBy: userId },
                    { date: { gte : date } }
                ]
            },
            orderBy: {
                date: 'desc'
            }
        })

        return meetiByUserId
    }

    async getMeetiById(meetiId: string): Promise<SelectMeeti | null> {
        const meeti = await db.query.meeti.findFirst({
            where: {
                id: meetiId
            },
            with: {
                location: true
            }
        })

        return meeti || null
    }
}

export const meetiRepository = new MeetiRepository()