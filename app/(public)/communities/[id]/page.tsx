import { pluralize } from "@/src/db/utils/strings";
import CommunitiesActionPanel from "@/src/features/communities/components/CommunitiesActionPanel";
import { communityService } from "@/src/features/communities/services/CommunityService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import generatePageTitle from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Image from "next/image";


export async function generateMetadata( props : PageProps<'/communities/[id]'> ) : Promise<Metadata> {

    const { id } = await props.params
    const community = await communityService.getCommunityById(id)

    return {
        title: generatePageTitle(community.name)
    }
}


export default async function CommunitiesPage(props: PageProps<'/communities/[id]'>) {

    const { id } = await props.params

    const { session } = await requireAuth()
    const community = await communityService.getCommunityDetails(id, session?.user)
    return (
        <>
            <main className="max-w-7xl mx-auto space-y-5 p-10 lg:p-0 mt-10">
                {
                    community.permissions && (
                        <CommunitiesActionPanel permissions={community.permissions} communityId={id}/>
                    )
                }
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start mt-10">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="relative size-64 mx-auto aspect-square overflow-hidden rounded-full">
                            <Image
                                src={community.data.image}
                                alt={`Imagen de la comunidad ${community.data.image}`}
                                className="object-cover size-64"
                                width={600}
                                height={600}
                                priority
                            />
                        </div>
                        <Heading className="text-center">{community.data.name}</Heading>
                        <p className="text-gray-600 text-lg text-center">{community.data.description}</p>
                        <p className="text-gray-600 text-sm text-center">{community.membersCount} {pluralize('mienbro', community.membersCount!)}</p>
                    </div>
                    <div className="bg-slate-100 p-5 rounded-2xl">
                        {/* Admin Aquí */}
                    </div>
                </div>
            </main>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-10 max-w-7xl mx-auto mt-10 space-y-5">
                {/* Próximos Meetis Aquí */}
            </div>
        </>
    );
}