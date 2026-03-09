import { comunity } from "@/src/db/schemas"

export type InsertComunity = typeof comunity.$inferInsert
export type SelectComunity = typeof comunity.$inferSelect



export type CommunityWithPermissions = {
    data: SelectComunity,
    context: {
        isAdmin: boolean;
        isMember: boolean;
    }
    permissions: {
        canEdit: boolean;
        canDelete: boolean;
        canJoin: boolean;
        canViewMembers: boolean;
    }
}
