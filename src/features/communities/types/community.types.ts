import { communityMembers, comunity } from "@/src/db/schemas"
import { User } from "better-auth"

export type InsertComunity = typeof comunity.$inferInsert
export type SelectComunity = typeof comunity.$inferSelect
export type SelectCommunitiesMembers = typeof communityMembers.$inferSelect

export type JoinedCommunities = SelectCommunitiesMembers & {
    community: SelectComunity;
    user: User
}


export type CommunityPermissions = {
    canEdit: boolean;
    canDelete: boolean;
    canJoin: boolean;
    canViewMembers: boolean;
    canLeave: boolean
}

export type CommunityContext = {
    isAdmin: boolean;
    isMember: boolean;
}

export type CommunityWithPermissions = {
    data: SelectComunity,
    context: CommunityContext
    permissions: CommunityPermissions
}
