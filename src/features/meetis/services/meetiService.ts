import { communityRepository, ICommunityRepository } from "../../communities/services/CommunityRepository";
import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiRepository, meetiRepository } from "./meetiRepository";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";
import { User } from "better-auth";


class MetiService {
    constructor(
        private readonly meetiRepository: IMeetiRepository,
        private readonly communityRepository: ICommunityRepository
    ) { }

    async createMeeti(data: MeetiInput, user: User) {

        //* Comprobar que la comunidad existe y que el usuario es admin de esta
        const community = await this.communityRepository.findCommunityById(data.communityId)
        if( !community || !CommunityPolicy.isAdmin(user, community) ) {
            throw new Error('Hubo un error')
        }

        await this.meetiRepository.insert({...data, createdBy: user.id})
    }
}

export const meetiService = new MetiService(meetiRepository, communityRepository)