"use server"

import { requireAuth } from "@/src/lib/auth-server";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { meetiService } from "../services/meetiService";
import { User } from "better-auth";

export async function createMeetiAction(inputs: MeetiInput) {
    const { session } = await requireAuth()
    if (!session) return {
        error: 'Usuario no autenticado',
        success: ''
    }

    const data = MeetiSchema.safeParse(inputs)
    if (!data.success) return {
        error: 'Hubo un error',
        success: ''
    }

    await meetiService.createMeeti(data.data, session.user)

    return {
        error: '',
        success: 'Meeti Creado correctamente'

    }
}

export async function getUpcominngMeetisByUserId( user: User) {
    return await meetiService.getUpcomingMeetiByUserId(user) 
}

export async function updatedMeeti( inputs: MeetiInput, meetiId: string ) {
    
    const { session } = await requireAuth()
    if (!session) return {
        error: 'Usuario no autenticado',
        success: ''
    }

    const data = MeetiSchema.safeParse(inputs)

    if (!data.success) return {
        error: 'Hubo un error',
        success: ''
    }


    
    await meetiService.updateMeeti(inputs, meetiId, session.user)

    return {
        error: '',
        success: 'Meeti Actualizado'
    }
}