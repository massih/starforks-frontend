import { Injectable } from '@angular/core';
import { NewRecipe } from './new-recipe/new-recipe';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { RecipeDetails } from './recipe-detail/recipe-details';
import { PaginatedRecipes } from './recipes/paginated-recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl: string;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }; //TODO use this but not for save recipe

  saveRecipe(recipe: NewRecipe, file: File): Observable<any> {
    let formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(recipe)], {
      type: "application/json"
    }));
    formData.append("file", file, file.name);
    return this.http
      .post<string>(this.backendUrl, formData, {reportProgress: true, observe: "events"})
      .pipe(
        catchError(this.handleError<string>('postRecipes', "Something went wrong!"))
      );
  }

  getRecipes(searchWords: string, skip: number, limit: number): Observable<PaginatedRecipes> {
    return this.http
      .get<PaginatedRecipes>(this.backendUrl + "/", {
        params: new HttpParams()
        .set('searchWords', searchWords)
        .set('skip', skip)
        .set('limit', limit)
    })
      .pipe(
        catchError(this.handleError<PaginatedRecipes>('getRecipes', undefined))
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
