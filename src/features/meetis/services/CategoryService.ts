import { notFound } from "next/navigation";
import { categoryRepository, type ICategoryRepository } from "./CategoryRepository";

class CategoryService {
    constructor(
        private readonly categoryRepository : ICategoryRepository
    ){}

    async findAllCategories() {
        return await this.categoryRepository.findAll()
    }

    async findCategoryById(categoryId : string) {
        const category = await this.categoryRepository.findById(categoryId)
        if(!category) notFound()
        return category
    }
}

export const categoryService = new CategoryService(categoryRepository)