import { db } from "@/src/db"
import { communityMembers } from "@/src/db/schemas"
import { and, count, eq } from "drizzle-orm"
import { JoinedCommunities } from "../types/community.types"


export interface IMembershipRepository {
    addMember(communityId: string, userId: string): Promise<void>,
    removeMember(communityId: string, userId: string): Promise<void>,
    isMember(communityId: string, userId: string): Promise<boolean>,
    findJoinedCommunities( userId: string ): Promise<JoinedCommunities[]>
    getMembersCount( communityId : string ) : Promise<number>
}

class MembershipRepository implements IMembershipRepository {
    async addMember(communityId: string, userId: string): Promise<void> {
        await db.insert(communityMembers).values({ communityId, userId })
    }

    async isMember(communityId: string, userId: string): Promise<boolean> {
        const [result] = await db
                                .select()
                                .from(communityMembers)
                                .where(and(
                                    eq(communityMembers.communityId, communityId),
                                    eq(communityMembers.userId, userId)
                                ))

        return !!result
    }

    async removeMember(communityId: string, userId: string): Promise<void> {
        await db
                .delete(communityMembers)
                .where(and(
                    eq(communityMembers.communityId, communityId),
                    eq(communityMembers.userId, userId)
                ))
    }

    async findJoinedCommunities( userId: string): Promise<JoinedCommunities[]> {
        const result = await db.query.communityMembers.findMany({
            where: {
                userId
            },
            with: {
                community: true,
                user: true
            }
        })

        return result             
    }

    async getMembersCount(communityId: string): Promise<number> {
        const [ result ] = await db.select( { count: count() } ).from(communityMembers).where(eq(communityMembers.communityId, communityId))
        return result.count
    }
}

export const membershipRepository = new MembershipRepository()