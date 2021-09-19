import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
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

  emptyRecipe = (): Recipe => ({ author: "", createdAt: "", id: 0, ingredients: "", name: "", picture: "", steps: "", type: RecipeType.Starter });

  @Input()
  newRecipe = this.emptyRecipe()

  constructor(private recipeService: RecipeService) {
    this.recipeTypeNumbers = Object.keys(this.recipeTypes).map(k => Number(k)).filter(k => !Number.isNaN(k));
  }
  submit(): void {
    console.log(this.newRecipe)
    this.recipeService.saveRecipe(this.newRecipe).subscribe(id => console.log(id))
  }
  ngOnInit(): void {

  }


}
