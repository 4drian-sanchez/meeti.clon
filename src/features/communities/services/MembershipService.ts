import { INotificationRepository, notificationRepository } from '../../notifications/services/Notification.repository';
import { INotificationService, notificationService } from '../../notifications/services/Notification.services';
import { CommunityPolicy } from '../policies/CommunityPolicy';
import { MembershipPolicy } from '../policies/MembershipPolicy';
import { communityRepository, ICommunityRepository } from './CommunityRepository';
import { IMembershipRepository, membershipRepository } from './MembershipRepository';
import { User } from 'better-auth';


class MembershipService {

    constructor(
        private readonly membershipRepository: IMembershipRepository,
        private readonly communityRepository: ICommunityRepository,
        private readonly notificationRepository: INotificationRepository,
        private readonly notificationService : INotificationService
    ) { }

    async toggleMembership(communityId: string, user: User) {

        //* Verificar que existe la comunidad
        const community = await this.communityRepository.findCommunityById(communityId)
        if (!community) return

        // Si no es miembro, unir
        const isMember = await this.membershipRepository.isMember(communityId, user.id)
        
        // Unir mienbro
        if (MembershipPolicy.canJoin(user, community, isMember)) {

            await this.membershipRepository.addMember(communityId, user.id)

            //Crear y enviar una notificación
            await this.notificationService.createAndNotify({
                userId: community.createdBy,
                actorName: user.name,
                message: `El usuario ${user.name} se ha unido a tu comunidad ${community.name}`,
                target: community.name
            })


            return {
                success: true,
                message: `Te has unido a la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: false
                }
            }
        }

        //salir mienbro
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

    async getJoinedCommunities(user: User) {
        const joined = await this.membershipRepository.findJoinedCommunities(user.id)

        const enriched = Promise.all(joined.map(async ({community}) => {

            const isMember = await membershipRepository.isMember(community.id, user.id)
            const isAdmin = CommunityPolicy.isAdmin(user, community)
            const membersCount = await this.membershipRepository.getMembersCount(community.id)

            return {
                data: community,
                membersCount,
                context: {
                    isAdmin,
                    isMember
                },
                permissions: {
                    canEdit: MembershipPolicy.canEdit(user, community),
                    canDelete: MembershipPolicy.canDelete(user, community),
                    canJoin: MembershipPolicy.canJoin(user, community, isMember),
                    canLeave: MembershipPolicy.canLeave(user, community, isMember),
                    canViewMembers: CommunityPolicy.canViewMembers(user, community)
                }
            }

        }))
        return enriched
    }

}

export const membershipService = new MembershipService(membershipRepository, communityRepository, notificationRepository, notificationService)