import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { NeedAuthGuard } from './guards/need-auth.guard';
import { AlreadyAuthedGuard } from './guards/already-authed.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    NeedAuthGuard,
    AlreadyAuthedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
