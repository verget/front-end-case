import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeComponent } from './joke.component';
import { UnQuotPipe } from "../../../pipes/un-quot.pipe";
import { fakeJoke } from "../../../mocks/fakeJoke";

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JokeComponent,
        UnQuotPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    component.joke = fakeJoke;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have joke input value', () => {
    expect(component.joke).toBeDefined();
  });

  it('should emit output event save on joke selection', () => {
    spyOn(component.save, 'emit');
    component.makeFavorite();
    expect(component.save.emit).toHaveBeenCalled();
  });

  it('should emit output event remove on joke selection', () => {
    spyOn(component.remove, 'emit');
    component.removeFavorite();
    expect(component.remove.emit).toHaveBeenCalled();
  });
});
