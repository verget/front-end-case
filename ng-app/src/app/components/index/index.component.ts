import { Component, OnInit } from '@angular/core';
import { JokesService } from "../../services/jokes.service";
import { Joke } from "../../models/Joke";

@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public jokes: Joke[] = [];
  public favoriteJokes: Joke[] = [];
  public showAlert: string;

  constructor(
    private jokesService: JokesService
  ) { }

  ngOnInit() {
    this.jokesService.fetchRandomJokes(10).subscribe(response => {
      console.log(response);
      this.jokes = response;
    });
    this.jokesService.getFavorites().subscribe(response => {
      console.log(response);
      this.favoriteJokes = response;
    })
  }

  makeFavorite(joke: Joke) {
    if (this.favoriteJokes.length < 10) {
      this.showAlert = '';
      joke.favorite = true;
      this.favoriteJokes.push(joke);
      this.jokesService.saveFavoriteJoke(joke.id).subscribe();
    } else {
      this.showAlert = "You can't have more then 10 favorites";
    }
  }

  removeFavorite(joke, index) {
    joke.favorite = false;
    this.favoriteJokes.splice(index, 1);
    this.jokesService.removeFavoriteJoke(joke.id).subscribe();
  }

  startTimer() {
    this.jokesService.fetchRandomJoke().subscribe();
  }
}
