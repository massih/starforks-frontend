import { RecipeType } from "../enums/recipeTypeEnum";

export interface RecipeDetails {
    id: number;
    name: string;
    ingredients: string; 
    steps: string;
    author: string;
    createdAt: string;
    picture: string;
    type: RecipeType;
}