import { db } from "@/src/db"
import { categories, type Category } from "@/src/db/schemas/category"
import { eq } from "drizzle-orm"

interface ICategoryRepository {
    findAll() : Promise<Category[]>
    findById( categoryId : string ) : Promise<Category>
}

class CategoryRepository implements ICategoryRepository {

    async findAll(): Promise<Category[]> {
        const allCategories = await db.select().from(categories)
        return allCategories
    }

    async findById(categoryId: string): Promise<Category> {
        const [category] = await db.select().from(categories).where( eq( categories.id, categoryId ) ).limit(1)
        return category
    }


}

export const categoryRepository = new CategoryRepository()