import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AlreadyAuthedGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('authToken')) {
      return true;
    }
    this.router.navigate(['/main']);
    return false;
  }
}