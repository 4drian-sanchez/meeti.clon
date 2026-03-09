import Heading from "@/components/typography/Heading";
import { communityService } from '../../../../../src/features/communities/services/CommunityService';
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import EditCommunity from "@/src/features/communities/components/EditCommunity";
import { Metadata } from "next";


export async function generateMetadata ( props : PageProps<'/dashboard/communities/[id]/edit'> ) : Promise<Metadata> {

  const { id } = await props.params
  const community = await communityService.getCommunityById(id)

  return {
    title: `Editar comunidad ${community.name}`,
    description: `Edición de la comunidad ${community.name}`
  }

}

export default async function page( props : PageProps<'/dashboard/communities/[id]/edit'> ) {

    const { id } = await props.params
    const {session } = await requireAuth()
    if(!session) redirect('/dashboard/communities')

    const community = await communityService.getCommunityDetails(id, session.user)
    if(!community.permissions.canEdit) redirect('/dashboard/communities')

  return (
    <>
        <Heading>Editar Comunidad: {community.data.name}</Heading>
        <EditCommunity community={community.data} communityId={id}/>
    </>
  );
}