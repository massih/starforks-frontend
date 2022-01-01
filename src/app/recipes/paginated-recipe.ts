import { RecipePreview } from "./recipe-preview";

export interface PaginatedRecipes {
    recipes: RecipePreview[];
    total: number
}