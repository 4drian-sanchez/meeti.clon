import { InsertComunity, SelectComunity } from '../types/community.types';
import { db } from "@/src/db";
import { communities } from "@/src/db/schemas/community";
import { eq } from "drizzle-orm";
import { CommunityInput } from '../schemas/communitiesSchema';

export interface ICommunityRepository {
    create: ( data : InsertComunity ) => Promise<SelectComunity>
    findCommunitiesByUser( userId : string, limit?: number ) : Promise<SelectComunity[]>
    findCommunityById( communityId : string ) : Promise<SelectComunity | undefined>
    updatedCommunity( communityId : string, data: CommunityInput) : Promise<void>
    deleteCommunity( communityId : string ) : Promise<void>
}

class CommunityRepository implements ICommunityRepository {

    async create( data : InsertComunity ) {
        const [createdCommunity] = await db.insert(communities).values(data).returning()
        return createdCommunity
    }

    async findCommunitiesByUser(userId: string, limit: number = 10): Promise<SelectComunity[]> {
        const result = await db
                                    .select()
                                    .from(communities)
                                    .where( eq(communities.createdBy, userId))
                                    .limit(limit)
        return result
    }

    async findCommunityById(communityId: string): Promise<SelectComunity | undefined> {
        const [ communityById ] = await db
                                    .select()
                                    .from(communities)
                                    .where( eq(communities.id, communityId))
                                    .limit(1)
        return communityById
    }

    async updatedCommunity(communityId: string, data: CommunityInput): Promise<void> {
        await db
                .update(communities)
                .set({...data})
                .where( eq(communities.id, communityId ) )
    }

    async deleteCommunity(communityId: string): Promise<void> {
        await db
                .delete(communities)
                .where(eq(communities.id, communityId ))
    }

}


export const communityRepository = new CommunityRepository()
