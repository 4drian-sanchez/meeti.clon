import { auth } from "@/src/lib/auth"
import { InsertComunity, SelectComunity } from "../types/community.types"
import { db } from "@/src/db"
import { community } from "@/src/db/schemas/comunity"
import { eq } from "drizzle-orm"

export interface ICommunityRepository {
    create: ( data : InsertComunity ) => Promise<SelectComunity>
    findCommunitiesBy( userId : string, limit: number ) : Promise<SelectComunity[]>
}

class CommunityRepository implements ICommunityRepository {

    async create( data : InsertComunity ) {
        const [createdCommunity] = await db.insert(community).values(data).returning()
        return createdCommunity
    }

    async findCommunitiesBy(userId: string, limit: number): Promise<SelectComunity[]> {
        const communities = await db
                                    .select()
                                    .from(community)
                                    .where( eq(community.createdBy, userId))
                                    .limit(limit)
        return communities
    }

}


export const communityRepository = new CommunityRepository()
