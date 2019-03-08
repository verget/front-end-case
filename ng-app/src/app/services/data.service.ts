import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://127.0.0.1:2017/rest';

  constructor(
    private http: HttpClient
  ) { }

  fetchRandomJokes(count: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/jokes`);
  }
}
