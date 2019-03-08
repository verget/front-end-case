import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  fetchRandomJokes(count: number): Observable<any> {
    const params = new HttpParams().set('count', count.toString());
    return this.http.get(`${this.apiUrl}/jokes`, { params });
  }
}
