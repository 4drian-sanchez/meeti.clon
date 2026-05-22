import { Category } from "@/src/db/schemas/category";
import { FormError, FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";
import { useFormContext } from "react-hook-form";
import { MeetiInput } from "../schemas/meetiSchema";

const categoriesPromise = fetch('/api/categories').then(res => res.json())

function CategoriesOptions () {

    const categories = use<Category[]>( categoriesPromise )
    const { register, formState : {errors} } = useFormContext<MeetiInput>()

    return (
        <>
            <FormLabel>Categorias meeti</FormLabel>
            <FormSelect 
                {...register('categoryId')}
            >
                <option value="">Seleccione una categoria</option>
                {categories.map( category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ) )}
            </FormSelect>

            {errors.categoryId && <FormError>{errors.categoryId.message}</FormError>}
        </>
    )
}

export default function CategoriesFormField() {
  return (
      <Suspense fallback={'cargando...'}>
        <CategoriesOptions />
      </Suspense>
  );
}