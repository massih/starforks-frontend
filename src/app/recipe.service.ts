import { Injectable } from '@angular/core';
import { NewRecipe } from './new-recipe/new-recipe';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { EnvService } from './env.service';
import { RecipeDetails } from './recipe-detail/recipe-details';
import { RecipePreview } from './recipes/recipe-preview';
import { PaginatedRecipe } from './recipes/paginated-recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl: string;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  saveRecipe(recipe: NewRecipe, file: File): Observable<Number> {
    let formData = new FormData();


    formData.append('recipe', new Blob([JSON.stringify(recipe)], {
      type: "application/json"
    }), "aaa");
    formData.append("file", file, file.name);
    return this.http
      .post<Number>(this.backendUrl, formData, {})
      .pipe(
        catchError(this.handleError<Number>('postRecipes', -1))
      );
  }

  getRecipes(searchWords: string, skip: number, limit: number): Observable<PaginatedRecipe> {
    return this.http
      .get<PaginatedRecipe>(this.backendUrl + "/", {
        params: new HttpParams()
        .set('searchWords', searchWords)
        .set('skip', skip)
        .set('limit', limit)
    })
      .pipe(
        catchError(this.handleError<PaginatedRecipe>('getRecipes', undefined))
      );
  }

  getRecipe(id: string): Observable<RecipeDetails> {
    return this.http
      .get<RecipeDetails>(this.backendUrl + "/id/" + id)
      .pipe(
        catchError(this.handleError<RecipeDetails>('getRecipeWithId',))
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

  constructor(private http: HttpClient, private env: EnvService) {
    this.backendUrl = env.apiUrl
  }
}
