"use server"

import { requireAuth } from "@/src/lib/auth-server"
import { redirect } from "next/navigation"
import { membershipService } from "../services/MembershipService"

export async function MembershipAction( communityId: string ) {

    const {session} = await requireAuth()
    if(!session) redirect('/auth/login')

    //*Agregar usuario

    await membershipService.toggleMembership(communityId, session.user)
}