import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jokesUrl = '';

  constructor(
    private http: HttpClient
  ) { }

  fetchRandomJokes(count: number): Observable<any> {
    return this.http.get(`${this.jokesUrl}/${count}`);
  }
}
