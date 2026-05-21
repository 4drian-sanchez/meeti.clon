import { requireAuth } from "@/src/lib/auth-server";
import { communityService } from '../../../src/features/communities/services/CommunityService';

export async function GET() {
    const { session } = await requireAuth()
    if( !session ) return new Response(JSON.stringify([]))

    const communities = await communityService.getCommunitiesByUserAPI(session.user.id)
    return new Response( JSON.stringify(communities), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    } )
}