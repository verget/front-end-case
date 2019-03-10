import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  registration(email: string, password: string, password2: string): Observable<{}> {
    return this.http.post(`${this.apiUrl}/register`, { email,  password, password2})
      .pipe(tap((response: { token: string, user: {} }) => this.saveToken(response.token)));
  }

  login(email: string, password: string): Observable<{}> {
    return this.http.post(`${this.apiUrl}/login`, { email,  password})
      .pipe(tap((response: { token: string, user: {} }) => {
        console.log(response);
        this.saveToken(response.token)
      }));
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
}
