import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RecipeDetails } from './recipe-detail/recipe-details';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const recipes = [
      { id: 31, name: 'Fettuccine alfredo' },
      { id: 12, name: 'Kebab alfredo' },
      { id: 11, name: 'Potatoes alfredo' },
    ];
    return {recipes};
  }

  // Overrides the genId method to ensure that a recipe always has an id.
  // If the recipes array is empty,
  // the method below returns the initial number (11).
  // if the recipes array is not empty, the method below returns the highest
  // recipe id + 1.
  genId(recipes: RecipeDetails[]): number {
    return recipes.length > 0 ? Math.max(...recipes.map(recipe => recipe.id)) + 1 : 11;
  }
}