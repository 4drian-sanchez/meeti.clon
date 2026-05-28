import { requireAuth } from "@/src/lib/auth-server";
import { communityService } from '../../../src/features/communities/services/CommunityService';
import { NextResponse } from 'next/server';


export async function GET() {
    const { session } = await requireAuth()
    if( !session ) return NextResponse.json([])

    const communities = await communityService.getCommunitiesByUserAPI(session.user.id)
    return NextResponse.json(communities)
}