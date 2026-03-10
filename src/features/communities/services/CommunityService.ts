import { notFound } from "next/navigation";
import { User } from "../../auth/types";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { CommunityInput } from "../schemas/communitiesSchema";
import { ICommunityRepository, communityRepository } from "./CommunityRepository";
import { checkPassword } from "@/src/shared/utils/auth";
import { deleteUTFiles } from "@/src/lib/uploadthing-server";

class CommunityService {

    constructor(
        private readonly communityRepository: ICommunityRepository
    ) { }

    async createCommunity(data: CommunityInput, userId: string) {
        const createdCommunity = await this.communityRepository.create({
            ...data,
            createdBy: userId
        })

        return createdCommunity
    }

    async getCommunitiesByUser(user: User, limit = 10) {
        const communities = await communityRepository.findCommunitiesByUser(user.id, limit)

        const enriched = Promise.all(communities.map(async (community) => {

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

        }))
        return enriched
    }

    async getCommunityById(communityId: string) {
        const community = await communityRepository.findCommunityById(communityId)
        if (!community) notFound()
        return community
    }

    async getCommunityDetails(communityId: string, user: User) {
        const community = await this.getCommunityById(communityId)

        const isMember = false
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
    }

    async updatedCommunity(communityId: string, data: CommunityInput) {
        await this.communityRepository.updatedCommunity(communityId, data)
        return {
            error: '',
            success: 'Comunidad actualizada'
        }
    }

    async deleteCommunity( communityId: string, password: string, user: User ) {

        //*Obtener commmunity
        const community = await this.getCommunityById(communityId)

        //*Verficar permisos
        if( !MembershipPolicy.canDelete(user, community) ) {
            throw new Error('No tienes permisos para eliminar esta comunidad')
        }

        //*Verficar password
        const isValidPassword = await checkPassword(password)
        if(!isValidPassword) {
            return {
                error: 'La contraseña es incorrecta',
                success: ''
            }
        }

        //*Eliminar
        await communityRepository.deleteCommunity(communityId)
        await deleteUTFiles(community.image)

        return {
            error: '',
            success: 'Comunidad eliminada',
        }
    }

}

export const communityService = new CommunityService(communityRepository) 