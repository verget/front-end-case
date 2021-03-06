import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Joke } from "../../../models/Joke";

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements OnInit {

  @Input() jokes: Joke[];
  @Output() save = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  makeFavorite(joke: Joke) {
    this.save.emit(joke);
  }

  removeFavorite(joke: Joke) {
    this.remove.emit(joke);
  }
}
