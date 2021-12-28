import { RecipeType } from './enums/recipeTypeEnum';
import { RecipeDetails } from './recipe-detail/recipe-details'

export const RECIPES: RecipeDetails[] = [
    {
        author: "Massih",
        createdAt: "Martedí",
        id: 31,
        ingredients: "pasta, butter, alfredo",
        name: "Fettuccine alfredo",
        picture: "A disgusting picture",
        steps: "Take fettuccine, take Alfredo, and throw them away",
        type: RecipeType.FirstDishes
    },
    {
        author: "Kinan",
        createdAt: "Martedí",
        id: 12,
        ingredients: "pasta, kebab, alfredo",
        name: "Kebab alfredo",
        picture: "A sliced Alfredo",
        steps: "Take Alfredo, roast him because of those fettuccine",
        type: RecipeType.Main
    },
    {
        author: "Fabio",
        createdAt: "Martedí",
        id: 11,
        ingredients: "pasta, potatoes, alfredo",
        name: "Potatoes alfredo",
        picture: "A potatoed Alfredoed",
        steps: "Take Alfredo and potatize him",
        type: RecipeType.Dessert
    },
];