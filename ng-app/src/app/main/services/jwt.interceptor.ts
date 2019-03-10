import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
      private injector: Injector, 
      private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestWithAuthHeader = this.addAuthorization(request);
    return next.handle(requestWithAuthHeader);
  }

  private addAuthorization = (request: HttpRequest<any>): HttpRequest<any> => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    const params = { setHeaders: { 'Authorization': `Bearer ${token}` } };

    return token ? request.clone(params) : request;
  }
}