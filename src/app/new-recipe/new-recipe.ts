import { RecipeType } from "../enums/recipeTypeEnum";

export interface NewRecipe {
    name: string;
    ingredients: string; 
    steps: string; 
    author: string;
    type: RecipeType;
}