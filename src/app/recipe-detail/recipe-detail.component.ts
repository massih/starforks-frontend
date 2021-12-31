import { Component, OnInit, Input } from '@angular/core';
import { RecipeDetails } from './recipe-details';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe?: RecipeDetails;
  thumbnail: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.recipe = recipe;
        if (recipe.picture) {
          this.thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + recipe.picture);
        } else {
          this.thumbnail = 'No image';
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

}
