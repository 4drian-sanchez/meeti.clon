import { CommunityInput } from "../schemas/communitiesSchema";
import { ICommunityRepository, communityRepository } from "./CommunityRepository";

class CommunityService {

    constructor(
        private readonly communityRepository : ICommunityRepository
    ){}

    async createCommunity( data: CommunityInput, userId: string ) {
        console.log(data)
        console.log(userId)
    }

}

export const communityService = new CommunityService(communityRepository)