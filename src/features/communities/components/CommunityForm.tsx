import { FormError, FormInput, FormLabel, FormTextarea } from "@/components/forms";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "../schemas/communitiesSchema";
import UploadImage from "@/components/upload/UploadImage";


export default function CommunityForm() {

  const { register, formState: { errors } } = useFormContext<CommunityInput>()


  return (
    <>
      <FormLabel htmlFor="name">Nombre de la comunidad</FormLabel>
      <FormInput
        id="name"
        type="text"
        placeholder="Titulo de la comunidad"
        {...register('name')}
      />
      {errors.name && <FormError>{errors.name.message}</FormError>}

      <FormLabel>Imagen de la comunidad</FormLabel>
      <UploadImage uploadImageLabel={"Imagen de la comunidad"} />

      <FormLabel htmlFor="description">Descripción de la comunidad</FormLabel>
      <FormTextarea
        id="description"
        placeholder="Descripción de la comunidad"
        {...register('description')}
      />
      {errors.description && <FormError>{errors.description.message}</FormError>}
    </>
  ); 
}