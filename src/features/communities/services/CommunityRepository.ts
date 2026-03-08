import { auth } from "@/src/lib/auth"
import { InsertComunity, SelectComunity } from "../types/community.types"
import { db } from "@/src/db"
import { community } from "@/src/db/schemas/comunity"

export interface ICommunityRepository {
    create: ( data : InsertComunity ) => Promise<SelectComunity>
}

class CommunityRepository implements ICommunityRepository {

    async create( data : InsertComunity ) {
        const [createdCommunity] = await db.insert(community).values(data).returning()
        return createdCommunity
    }

}


export const communityRepository = new CommunityRepository()
