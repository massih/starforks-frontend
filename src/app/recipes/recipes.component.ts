import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { RecipeDetails } from '../recipe-detail/recipe-details';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: RecipeDetails[] = [];

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }
}
