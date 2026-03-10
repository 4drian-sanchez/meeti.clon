"use server"

import { requireAuth } from "@/src/lib/auth-server";
import { CommunityInput, communitySchema } from "../schemas/communitiesSchema";
import { communityService } from "../services/CommunityService";
import { redirect } from "next/navigation";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { CheckPassword, CheckPasswordSchema } from "../../auth/schemas/authSchemas";

export async function communityAction(data: CommunityInput) {

    const validateData = communitySchema.safeParse(data)
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

    return {
        error: '',
        success: 'Comunidad creada con exito'
    }
}

export async function updatedCommunity(data: CommunityInput, communityId: string) {

    const validateData = communitySchema.safeParse(data)
    if (!validateData.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const updatedResponse = await communityService.updatedCommunity(communityId, data)
    return updatedResponse

}

export async function deleteCommunityAction(password: string, communityId: string) {
    const validateData = CheckPasswordSchema.safeParse({password})
    if (!validateData.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const {session} = await requireAuth()
    if(!session) redirect('/auth/login')

    const response = await communityService.deleteCommunity(password, communityId, session.user)
    return response

}