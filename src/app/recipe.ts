import { RecipeType } from "./enums/recipeTypeEnum";

export interface Recipe {
    id: number;
    name: string;
    ingredients: string; //change to proper object
    steps: string; //change to proper object
    author: string;
    createdAt: string;
    picture: string; // what is this one?
    type: RecipeType;
}