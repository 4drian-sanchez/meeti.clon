import { FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";

const communitiesPromise = fetch('/api/communities').then(res => res.json())

function CommunitiesOptions () {

    const communities = use<{id: string, name: string}[]>( communitiesPromise )

    return (
        <>
            <FormLabel>Comunidades meeti</FormLabel>
            <FormSelect>
                <option value="">Seleccione una comunidad</option>
                {communities.map( community => (
                  <option key={community.id} value={community.id}>{community.name}</option>
                ) )}
            </FormSelect>
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