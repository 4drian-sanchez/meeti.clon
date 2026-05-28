import { categoryService } from "@/src/features/meetis/services/CategoryService";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await categoryService.findAllCategories()
    return NextResponse.json(categories)
}