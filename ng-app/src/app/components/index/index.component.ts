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

  constructor(
    private jokesService: JokesService
  ) { }

  ngOnInit() {
    this.jokesService.fetchRandomJokes(10).subscribe(response => {
      console.log(response);
      this.jokes = response;
    })
  }

  makeFavorite(joke: Joke) {
    if (!joke.isFavorite && this.favoriteJokes.length < 10) {
      joke.isFavorite = true;
      this.favoriteJokes.push(joke);
      this.jokesService.saveFavoriteJoke(joke.id).subscribe();
    }
  }

  removeFavorite(joke, index) {
    joke.isFavorite = false;
    this.favoriteJokes.splice(index, 1);
  }
}
