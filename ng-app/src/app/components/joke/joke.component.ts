import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Joke } from "../../models/Joke";

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokeComponent {

  @Input() joke: Joke;

  @Output() save = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() { }

  makeFavorite() {
    this.save.emit(this.joke);
  }

  removeFavorite() {
    this.remove.emit(this.joke)
  }
}
