import { meetiService } from "@/src/features/meetis/services/meetiService";
import Heading from "@/src/shared/components/typography/Heading";

export default async function EditMeetiPage( props : PageProps<'/dashboard/communities/[id]/edit'> ) {

  const { id } = await props.params

  const meeti = await meetiService.getMeetiById( id )
  console.log(meeti);

  return (
    <>
      <Heading>Editar Meeti</Heading>
    </>
  );
}