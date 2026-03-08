"use server"

import { requireAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schemas/communitiesSchema";
import { communityService } from "../services/CommunityService";

export async function communityAction(data: CommunityInput) {

    const validateData = CommunitySchema.safeParse(data)
    if (!validateData.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const { session } = await requireAuth()
    if (!session) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    await communityService.createCommunity(validateData.data, session.user.id)

}