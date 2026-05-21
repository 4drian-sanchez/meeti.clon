import { categoryService } from "@/src/features/meetis/services/CategoryService";


export async function GET() {
    const categories = await categoryService.findAllCategories()
    return new Response(JSON.stringify(categories), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    })
}