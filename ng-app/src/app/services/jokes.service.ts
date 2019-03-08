import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { environment } from '../../environments/environment';
import { Joke } from "../models/Joke";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  fetchRandomJokes(count: number): Observable<Joke[]> {
    const params = new HttpParams().set('count', count.toString());
    return this.http.get(`${this.apiUrl}/jokes`, { params })
      .pipe(map((response: {type: string, value: Joke[]}) => response.value));
  }

  saveFavoriteJoke(id: number): Observable<any>{
    return this.http.post(`${this.apiUrl}/favorite`, { id });
  }

  getFavorites(): Observable<Joke[]>{
    return this.http.get(`${this.apiUrl}/favorites`);
  }
}
