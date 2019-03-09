import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './components/index/index.component';
import { JokesService } from "./services/jokes.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { JokeComponent } from './components/joke/joke.component';
import { JokeListComponent } from './components/joke-list/joke-list.component';
import { UnQuotPipe } from './pipes/un-quot.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    JokeComponent,
    JokeListComponent,
    UnQuotPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    JokesService
  ],
  bootstrap: [IndexComponent]
})
export class AppModule { }
