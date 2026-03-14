import Heading from "@/components/typography/Heading";
import CommunityItem from "@/src/features/communities/components/communityItem";
import { membershipService } from "@/src/features/communities/services/MembershipService";
import { requireAuth } from "@/src/lib/auth-server";
import generatePageTitle from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

const title = 'Comunidades a las que te uniste'

export const metadata: Metadata = {
    title: generatePageTitle(title)
}


export default async function JoinedCommunitiesPage() {

    const {session} = await requireAuth()
    if(!session) redirect('/auth/login')

    const communities = await membershipService.getJoinedCommunities(session.user)
    
    return (
        <>
            <Heading>{title}</Heading>

            <div className="flex justify-between flex-col lg:flex-row">
                <Link
                    href="/dashboard/communities"
                    className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
                >Volver a mis Comunidades</Link>
            </div>

            {
                communities.length 
                ? ( 
                    <ul role="list" className="divide-y divide-gray-100 mt-10 shadow-lg p-10">
                        {communities.map( community => (
                            <CommunityItem key={community.data.id} community={community} />
                        )  )}

                    </ul>
                ) : (
                    <p className="text-lg font-bold text-center">Aún no te has unido a una comunidad</p>
                )
            }

        </>
    );
}