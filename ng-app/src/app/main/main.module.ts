import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnQuotPipe } from '../pipes/un-quot.pipe';
import { JokeListComponent } from './components/joke-list/joke-list.component';
import { JokeComponent } from './components/joke/joke.component';
import { IndexComponent } from './components/index/index.component';
import { JokesService } from './services/jokes.service';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    IndexComponent,
    MainComponent,
    JokeComponent,
    JokeListComponent,
    UnQuotPipe
  ],
  imports: [
    MainRoutingModule,
    CommonModule
  ],
  providers: [
    JokesService
  ],
})
export class MainModule { }
