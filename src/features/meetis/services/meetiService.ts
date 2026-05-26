import { communityRepository, ICommunityRepository } from "../../communities/services/CommunityRepository";
import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiRepository, meetiRepository } from "./meetiRepository";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";
import { User } from "better-auth";
import { MeetiPolicy } from "../policies/meeti.policy";
import { InsertMeeti, SelectMeeti } from "../types/meeti.types";


class MetiService {
    constructor(
        private readonly meetiRepository: IMeetiRepository,
        private readonly communityRepository: ICommunityRepository
    ) { }

    async createMeeti(data: MeetiInput, user: User) {

        //* Comprobar que la comunidad existe y que el usuario es admin de esta
        const community = await this.communityRepository.findCommunityById(data.communityId)
        if (!community || !CommunityPolicy.isAdmin(user, community)) {
            throw new Error('Hubo un error')
        }

        await this.meetiRepository.insert({ ...data, createdBy: user.id })
    }


    async getUpcomingMeetiByUserId(user: User) {
        const upcomingMeetis = await this.meetiRepository.getUpcomingByUserId(user.id)

        return upcomingMeetis.map(meeti => ({
            context: {
                isAdmin: MeetiPolicy.isAdmin(user, meeti)
            },
            permissions: {
                canViewAttendes: MeetiPolicy.canViewAttendes(user, meeti),
                canEdit: MeetiPolicy.canEdit(user, meeti),
                canDelete: MeetiPolicy.canDelete(user, meeti)
            },
            data: meeti,
            attendanceCount: 0
        }))
    }

    //* En una arquitectura limpia el service se encarga de manejar los errores y el repository de solo llamar a la DB
    async getMeetiById(meetiId: string) {
        const meeti = await this.meetiRepository.getById(meetiId)
        if (!meeti) throw new Error('Meeti no encontrado')

        return meeti
    }

    async getMeetiWithDetails( meetiId: string, user?: User ) {
        const meetiWithDetails = await this.meetiRepository.getFullById(meetiId)

        return {
            data: meetiWithDetails,
            context: {

            },
            permissions: {
                
            }
        }
    }

    async getMeetiWithPermissions(meetiId: string, user: User) {
        const meeti = await this.getMeetiById(meetiId)
        return {
            data: meeti,
            context: {
                isAdmin: MeetiPolicy.isAdmin(user, meeti)
            },
            permissions: {
                canViewAttendes: MeetiPolicy.canViewAttendes(user, meeti),
                canEdit: MeetiPolicy.canEdit(user, meeti),
                canDelete: MeetiPolicy.canDelete(user, meeti)
            }
        }
    }

    async updateMeeti(data: MeetiInput, meetiId: string, user: User) {

        const community = await this.communityRepository.findCommunityById(data.communityId)
        if (!community || !CommunityPolicy.isAdmin(user, community)) {
            throw new Error('Hubo un error')
        }
        
        const meeti = await this.getMeetiById(meetiId)

        if( !MeetiPolicy.canEdit(user, meeti) ) throw new Error('Hubo un error: No Autorizado')
        await this.meetiRepository.update({...data, createdBy: meeti.createdBy}, meetiId)
    }
}

export const meetiService = new MetiService(meetiRepository, communityRepository)