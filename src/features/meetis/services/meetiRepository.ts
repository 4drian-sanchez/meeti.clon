import { db } from "@/src/db"
import type { InsertMeetiLocation, InsertMeeti, SelectMeeti,  FullMeeti } from "../types/meeti.types"
import { meeti, meetiLocations } from "@/src/db/schemas"
import { format } from "date-fns"
import { eq } from "drizzle-orm"

export interface IMeetiRepository {
    insert(data: InsertMeeti): Promise<void>
    getUpcomingByUserId(userId : string) : Promise<SelectMeeti[]>
    getById(meetiId: string) : Promise<SelectMeeti | null>
    update(data : InsertMeeti, meetiId: string) : Promise<void>
    getFullById( meetiId: string ) : Promise<FullMeeti | null>
}

class MeetiRepository implements IMeetiRepository {

    async insert(data: InsertMeeti): Promise<void> {
        const [ insertMeeti ] = await db.insert(meeti).values(data).returning()
        
        if( !data.virtual && data.location ) {
            await this.insertLocation({ ...data.location, meetiId: insertMeeti.id })
        }
    }

    async insertLocation(data : InsertMeetiLocation) {
        await db
            .insert(meetiLocations)
            .values({...data})
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

    async getById(meetiId: string): Promise<SelectMeeti | null> {
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

    async getFullById(meetiId: string): Promise<FullMeeti | null> {
        const meetiWithDetails = await db.query.meeti.findFirst({
            where: {
                id: meetiId
            },
            with: {
                location: true,
                category: true,
                community: true,
                admin: true
            }
        })

        return meetiWithDetails ?? null
    }

    async update(data : InsertMeeti, meetiId: string) {

        const { location, ...meetiData } = data;

        const [updatedMeeti] = await db
            .update(meeti)
            .set(meetiData) 
            .where(eq(meeti.id, meetiId))
            .returning()

        //* Buscamos si ya tiene una localización en la BD
        const meetiLocation = await db.query.meetiLocations.findFirst({
            where: {
                meetiId: updatedMeeti.id
            }
        })

        //* Si ahora es virtual y antes tenía locación, la borramos y salimos
        if (data.virtual && meetiLocation) {
            await this.deleteMeetiLocation(updatedMeeti.id)
            return
        }

        //* Si ahora es virtual pero NO tenía locación, no hay nada que hacer, salimos
        if (data.virtual) return;

        //* data.virtual es false se elimina la fila meetiLocation
        if(meetiLocation && data.virtual) {
            await this.deleteMeetiLocation(meetiLocation.id)
        }

        //* Si es presencial, viene nueva locación y YA existía una vieja: Actualizamos
        if(location && meetiLocation) {

            await db
                .update(meetiLocations)
                .set(location)
                .where(eq(meetiLocations.meetiId, updatedMeeti.id))

            return
        }

        //* Si es presencial, viene locación y NO existía antes (era virtual): Insertamos
        if (location) {
            await this.insertLocation({...location, meetiId: updatedMeeti.id});
        }
    }

    async deleteMeetiLocation(meetiId : string) {
        await db.delete( meetiLocations ).where( eq(  meetiLocations.meetiId, meetiId) )
    }
}

export const meetiRepository = new MeetiRepository()