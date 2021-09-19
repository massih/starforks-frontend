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
  private backendUrl = 'http://localhost:8080/recipe';  // URL to web api
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  saveRecipe(recipe: Recipe): Observable<Number> {
    return this.http
      .post<Number>(this.backendUrl, JSON.stringify(recipe), this.headers)
      .pipe(
        catchError(this.handleError<Number>('postRecipes', -1))
      );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.backendUrl + "/all")
      .pipe(
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http
      .get<Recipe>(this.backendUrl + "/" + id)
      .pipe(
        catchError(this.handleError<Recipe>('getRecipeWithId',))
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

  constructor(private http: HttpClient) { }
}
