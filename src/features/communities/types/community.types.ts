import { comunity } from "@/src/db/schemas"

export type InsertComunity = typeof comunity.$inferInsert
export type SelectComunity = typeof comunity.$inferSelect

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
