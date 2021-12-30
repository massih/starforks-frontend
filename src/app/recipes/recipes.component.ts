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
  searchWords: string = "";

  getRecipes(searchWords: string): void {
    this.recipeService.getRecipes(searchWords).subscribe(recipes => this.recipes = recipes);
  }

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes(this.searchWords);
  }

  public onSearchTypingFinished() {
    let wordSearch = this.searchWords;
    setTimeout(() => {
      if (wordSearch == this.searchWords) {
        this.getRecipes(this.searchWords);
      }
    }, 1000);
  }
}
