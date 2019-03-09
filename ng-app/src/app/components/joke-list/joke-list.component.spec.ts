import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeListComponent } from './joke-list.component';
import { JokeComponent } from "../joke/joke.component";
import { UnQuotPipe } from "../../pipes/un-quot.pipe";
import { fakeJoke } from 'src/app/mocks/fakeJoke';

describe('JokeListComponent', () => {
  let component: JokeListComponent;
  let fixture: ComponentFixture<JokeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JokeListComponent,
        JokeComponent,
        UnQuotPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.jokes = [fakeJoke];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have jokes input value', () => {
    expect(component.jokes).toBeDefined();
  });

  it('should emit output event save on joke selection', () => {
    spyOn(component.save, 'emit');
    component.makeFavorite(fakeJoke);
    expect(component.save.emit).toHaveBeenCalled();
  });

  it('should emit output event remove on joke selection', () => {
    spyOn(component.remove, 'emit');
    component.removeFavorite(fakeJoke);
    expect(component.remove.emit).toHaveBeenCalled();
  });
});
