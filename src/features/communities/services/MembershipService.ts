import { MembershipPolicy } from '../policies/MembershipPolicy';
import { communityRepository, ICommunityRepository } from './CommunityRepository';
import { IMembershipRepository, membershipRepository } from './MembershipRepository';
import { User } from 'better-auth';


class MembershipService {

    constructor(
        private readonly membershipRepository: IMembershipRepository,
        private readonly communityRepository: ICommunityRepository
    ) { }

    async toggleMembership(communityId: string, user: User) {

        //* Verificar que existe la comunidad
        const community = await this.communityRepository.findCommunityById(communityId)
        if (!community) return

        // Si no es miembro, unir
        const isMember = await this.membershipRepository.isMember(communityId, user.id)

        if (MembershipPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(communityId, user.id)
            return {
                success: true,
                message: `Te has unido a la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: false
                }
            }
        }

        if (MembershipPolicy.canLeave(user, community, isMember)) {
            await this.membershipRepository.removeMember(community.id, user.id)
            return {
                success: true,
                message: `Te has salido de la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: true
                }
            }
        }
    }

}

export const membershipService = new MembershipService(membershipRepository, communityRepository)