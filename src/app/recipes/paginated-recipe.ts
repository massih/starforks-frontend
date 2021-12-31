import { RecipePreview } from "./recipe-preview";

export interface PaginatedRecipe {
    recipes: RecipePreview[];
    total: number
}