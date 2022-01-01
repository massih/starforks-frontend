import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { RecipePreview } from './recipe-preview';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
  searchWords: string = "";
  recipes: RecipePreview[] = [];
  total: number = 0;
  pageSize: number = 2;
  page: number = 1;
  previousPage = 0;
  
  getRecipes(searchWords: string): void {
    let skip = (this.page - 1) * this.pageSize;
    this.recipeService.getRecipes(searchWords, skip, this.pageSize).subscribe(paginatedRecipes => {
      this.recipes = this.parseRecipes(paginatedRecipes.recipes)
      this.total = paginatedRecipes.total;
    });

  }

  constructor(private recipeService: RecipeService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getRecipes(this.searchWords);
  }
  parseRecipes(recipes: RecipePreview[]): RecipePreview[] {
    
    let parsedRecipes: RecipePreview[] = recipes;
    for (let parsedRecipe of parsedRecipes) {
      parsedRecipe.picture = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + parsedRecipe.picture);
    }
    return parsedRecipes;
  }

  public onSearchTypingFinished() {
    let wordSearch = this.searchWords;
    setTimeout(() => {
      if (wordSearch == this.searchWords) {
        this.getRecipes(this.searchWords);
      }
    }, 1000);
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getRecipes(this.searchWords);
    }
  }
}
