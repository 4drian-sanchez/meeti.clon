import { EditMeeti } from "@/src/features/meetis/components/EditMeeti";
import { meetiService } from "@/src/features/meetis/services/meetiService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata( props : PageProps<'/dashboard/communities/[id]/edit'> ) : Promise<Metadata> {

  const {id} = await props.params
  const meeti = await meetiService.getMeetiById(id)
  return {
    title: `Editar meeti : ${meeti.title}`
  }
}

export default async function EditMeetiPage( props : PageProps<'/dashboard/communities/[id]/edit'> ) {

  const { id } = await props.params
  const {session} = await requireAuth()
  if(!session) redirect('/auth/login')

  const meetiWithPermissions = await meetiService.getMeetiWithPermissions( id, session.user )
  if( !meetiWithPermissions.context.isAdmin ) redirect('/')

  return (
    <>
      <Heading>Editar Meeti: {meetiWithPermissions.data.title}</Heading>

      <EditMeeti meeti={meetiWithPermissions.data}/>
    </>
  );
}