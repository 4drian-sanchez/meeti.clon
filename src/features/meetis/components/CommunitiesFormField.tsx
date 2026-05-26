import { FormError, FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";
import { useFormContext } from "react-hook-form";
import { MeetiInput } from "../schemas/meetiSchema";

const baseUrl = process.env.SITE_URL! ?? 'http://localhost:3000'
const communitiesPromise = fetch(`${baseUrl}/api/communities`).then(res => res.json())

function CommunitiesOptions () {

    const communities = use<{id: string, name: string}[]>( communitiesPromise )
    const { register, formState: {errors} } = useFormContext<MeetiInput>()

    return (
        <>
            <FormLabel>Comunidades meeti</FormLabel>
            <FormSelect
                {...register('communityId')}
            >
                <option value="">Seleccione una comunidad</option>
                {communities.map( community => (
                  <option key={community.id} value={community.id}>{community.name}</option>
                ) )}
            </FormSelect>
            {errors.communityId && <FormError>{errors.communityId.message}</FormError>}
        </>
    )
}

export default function CommunitiesFormField() {
  return (
      <Suspense fallback={'cargando...'}>
        <CommunitiesOptions />
      </Suspense>
  );
}