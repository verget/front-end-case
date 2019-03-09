import { Component, OnDestroy, OnInit } from '@angular/core';
import { JokesService } from "../../services/jokes.service";
import { Joke } from "../../models/Joke";
import { Subscription } from "rxjs/internal/Subscription";
import { interval } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  public jokes: Joke[] = [];
  public favoriteJokes: Joke[] = [];
  public showAlert: string;
  public interval$: Subscription;
  private pageSubscriptions = new Subscription();

  constructor(
    private jokesService: JokesService
  ) { }

  ngOnInit() {
    this.jokesService.fetchRandomJokes(10).subscribe(response => {
      this.jokes = response;
    });
    this.jokesService.getFavorites().subscribe(response => {
      console.log(response);
      this.favoriteJokes = response;
    })
  }

  ngOnDestroy() {
    this.pageSubscriptions.unsubscribe();
  }

  makeFavorite(joke: Joke) {
    if (this.favoriteJokes.length < 10) {
      this.showAlert = '';
      joke.favorite = true;
      this.favoriteJokes.push(joke);
      this.favoriteJokes = [...this.favoriteJokes];
      this.jokesService.saveFavoriteJoke(joke.id).subscribe();
    } else {
      this.showAlert = "You can't have more then 10 favorites";
      this.stopTimer();
    }
  }

  removeFavorite(joke: Joke) {
    joke.favorite = false;
    this.showAlert = null;
    this.favoriteJokes = this.favoriteJokes.filter(elem => {
      return elem.id !== joke.id;
    });
    this.jokesService.removeFavoriteJoke(joke.id).subscribe();
  }

  startTimer() {
    this.interval$ = interval(3000).subscribe(tick => {
      this.jokesService.fetchRandomJokes(1).subscribe((response: Joke[]) => {
        if (this.favoriteJokes.length < 10) {
          this.makeFavorite(response[0]);
        } else {
          this.stopTimer();
        }
        console.log(response[0]);
      });
    });
    this.pageSubscriptions.add(this.interval$);
  }

  stopTimer() {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }
  }
}
