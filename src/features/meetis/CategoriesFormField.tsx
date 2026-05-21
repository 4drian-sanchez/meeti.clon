import { Category } from "@/src/db/schemas/category";
import { FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";

const categoriesPromise = fetch('/api/categories').then(res => res.json())

function CategoriesOptions () {

    const categories = use<Category[]>( categoriesPromise )

    return (
        <>
            <FormLabel>Categorias meeti</FormLabel>
            <FormSelect>
                <option value="">Seleccione una categoria</option>
                {categories.map( category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ) )}
            </FormSelect>
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