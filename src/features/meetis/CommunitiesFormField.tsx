import { FormLabel, FormSelect } from "@/src/shared/components/forms";

function CommunitiesOptions () {
    return (
        <>
            <FormLabel>Comunidades meeti</FormLabel>
            <FormSelect>
                <option value="">Seleccione una comunidad</option>
            </FormSelect>
        </>
    )
}

export default function CommunitiesFormField() {
  return (
    <>
      <CommunitiesOptions />
    </>
  );
}