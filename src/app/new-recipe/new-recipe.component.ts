import { Component, Input, OnInit } from '@angular/core';
import { RecipeType } from '../enums/recipeTypeEnum';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})

export class NewRecipeComponent implements OnInit {
  recipeTypes = RecipeType;
  recipeTypeNumbers: number[] = [];
  recipe1 = null;
  file: File | undefined

  emptyRecipe = (): Recipe => ({ author: "", createdAt: "", id: 0, ingredients: "", name: "", picture: "", steps: "", type: RecipeType.Starter });

  @Input()
  newRecipe = this.emptyRecipe()

  constructor(private recipeService: RecipeService) {
    this.recipeTypeNumbers = Object.keys(this.recipeTypes).map(k => Number(k)).filter(k => !Number.isNaN(k));
  }

  onChange(event) {
    this.file = event.target.files[0];
  }
  
  submit(): void {
    if (this.file) {
      console.log(this.newRecipe)
      this.recipeService.saveRecipe(this.newRecipe, this.file).subscribe(id => console.log(id))
    }
  }

  ngOnInit(): void {
  }
}
