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

}

export const communityService = new CommunityService(communityRepository)