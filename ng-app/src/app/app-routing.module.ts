import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: './main/main.module#MainModule',
    // canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    // canLoad: [ AlreadyAuthedGuard ],
    loadChildren: './auth/auth.module#AuthModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
