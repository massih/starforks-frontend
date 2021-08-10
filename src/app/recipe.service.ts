import { Injectable } from '@angular/core';
import { RECIPES } from './mock-recipes';
import { Recipe } from './recipe';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'apis/recipes';  // URL to web api

  getRecipes(): Observable<Recipe[]> {
    //const recipes = of(RECIPES);
    //return recipes;
    return this.http
      .get<Recipe[]>(this.recipesUrl)
      .pipe(
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getRecipe(id: number): Observable<Recipe> {
    const recipe = RECIPES.find(r => r.id === id)!;
    return of(recipe)
  }
  constructor(private http: HttpClient) { }
}
