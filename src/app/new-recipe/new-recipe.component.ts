import { Component, Input, OnInit } from '@angular/core';
import { RecipeType } from '../enums/recipeTypeEnum';
import { NewRecipe } from '../new-recipe/new-recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})

export class NewRecipeComponent implements OnInit {
  recipeTypes = RecipeType;
  recipeTypeNumbers: number[] = [];
  file: File | undefined;

  emptyRecipe = (): NewRecipe => ({ author: "", ingredients: "", name: "", steps: "", type: RecipeType.Starter });

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
      this.recipeService.saveRecipe(this.newRecipe, this.file).subscribe(events => console.log(events))
    } // TODO make it save even without picture
  }

  ngOnInit(): void {
  }
}
