import { Component, OnInit, Input } from '@angular/core';
import { RecipeDetails } from './recipe-details';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe?: RecipeDetails;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id)
      .subscribe(recipe => this.recipe = recipe);
  }

  goBack(): void {
    this.location.back();
  }

}
