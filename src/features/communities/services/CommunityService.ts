import { User } from "../../auth/types";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { CommunityInput } from "../schemas/communitiesSchema";
import { ICommunityRepository, communityRepository } from "./CommunityRepository";

class CommunityService {

    constructor(
        private readonly communityRepository : ICommunityRepository
    ){}

    async createCommunity( data: CommunityInput, userId: string ) {
        const createdCommunity = await this.communityRepository.create({
            ...data,
            createdBy: userId
        })

        return createdCommunity
    }

    async findCommunitiesBy( user : User, limit = 10 ) {
        const communities = await communityRepository.findCommunitiesBy(user.id, limit)

        const enriched = Promise.all( communities.map( async ( community ) => {

            const isMember = true
            const isAdmin = CommunityPolicy.isAdmin(user, community)

            return {
                data: community,
                context: {
                    isAdmin,
                    isMember
                },
                permissions: {
                    canEdit: MembershipPolicy.canEdit(user, community),
                    canDelete: MembershipPolicy.canDelete(user, community),
                    canJoin: MembershipPolicy.canJoin(user, community, isMember),
                    canViewMembers: CommunityPolicy.canViewMembers(user, community)
                }
            }

        } ) )
        return enriched
    }

}

export const communityService = new CommunityService(communityRepository)