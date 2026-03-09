import { InsertComunity, SelectComunity } from '../types/community.types';
import { db } from "@/src/db";
import { community } from "@/src/db/schemas/comunity";
import { eq } from "drizzle-orm";
import { CommunityInput } from '../schemas/communitiesSchema';

export interface ICommunityRepository {
    create: ( data : InsertComunity ) => Promise<SelectComunity>
    findCommunitiesByUser( userId : string, limit: number ) : Promise<SelectComunity[]>
    findCommunityById( communityId : string ) : Promise<SelectComunity | undefined>
    updatedCommunity( communityId : string, data: CommunityInput) : Promise<void>
}

class CommunityRepository implements ICommunityRepository {

    async create( data : InsertComunity ) {
        const [createdCommunity] = await db.insert(community).values(data).returning()
        return createdCommunity
    }

    async findCommunitiesByUser(userId: string, limit: number): Promise<SelectComunity[]> {
        const communities = await db
                                    .select()
                                    .from(community)
                                    .where( eq(community.createdBy, userId))
                                    .limit(limit)
        return communities
    }

    async findCommunityById(communityId: string): Promise<SelectComunity | undefined> {
        const [ communityById ] = await db
                                    .select()
                                    .from(community)
                                    .where( eq(community.id, communityId))
                                    .limit(1)
        return communityById
    }

    async updatedCommunity(communityId: string, data: CommunityInput): Promise<void> {
        await db
                .update(community)
                .set({...data})
                .where( eq(community.id, communityId ) )
    }

}


export const communityRepository = new CommunityRepository()
