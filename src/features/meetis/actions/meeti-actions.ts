"use server"

import { requireAuth } from "@/src/lib/auth-server";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { meetiService } from "../services/meetiService";

export async function createMeetiAction(inputs: MeetiInput) {
    const { session } = await requireAuth()
    if (!session) return {
        message: 'Usuario no autenticado',
        status: ''
    }

    const data = MeetiSchema.safeParse(inputs)
    if (!data.success) return {
        message: 'Hubo un error',
        status: ''
    }

    await meetiService.createMeeti(data.data, session.user)
}