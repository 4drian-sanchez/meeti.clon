import { db } from "@/src/db"


export interface IMeetiAttendeesRepository {
    isUserAttending( meetiId: string, userId: string ) : Promise<boolean>
}

class MeetiAttendeesRepository implements IMeetiAttendeesRepository{

    async isUserAttending(meetiId: string, userId: string): Promise<boolean> {
        const result = await db.query.meetiAttendees.findFirst({
            where: {
                AND: [
                    {meetiId}, {userId}
                ]
            }
        })

        return !!result
    }

}

export const meetiAttendeesRepository = new MeetiAttendeesRepository()