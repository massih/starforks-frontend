import { RecipeType } from "../enums/recipeTypeEnum";

export interface RecipePreview {
    id: string
    name: string;
    picture: string | any;
    type: RecipeType;
}