import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Joke } from "../../models/Joke";

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {

  @Input() joke: Joke;
  @Input() index: number;

  @Output() save = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.joke)
  }

  makeFavorite() {
    this.save.emit(this.joke);
  }

  removeFavorite() {
    this.remove.emit({
      joke: this.joke,
      index: this.index
    })
  }

}
