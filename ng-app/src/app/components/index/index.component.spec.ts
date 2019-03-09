import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { JokeListComponent } from "../joke-list/joke-list.component";
import { AppRoutingModule } from "../../app-routing.module";
import { JokeComponent } from "../joke/joke.component";
import { UnQuotPipe } from "../../pipes/un-quot.pipe";
import { HttpClientModule } from "@angular/common/http";
import { JokesService } from 'src/app/services/jokes.service';
import { jokesServiceMock } from 'src/app/mocks/jokesServiceMock';
import { fakeJoke } from 'src/app/mocks/fakeJoke';
import { of } from 'rxjs';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IndexComponent,
        JokeListComponent,
        JokeComponent,
        UnQuotPipe
      ],
      imports: [
        AppRoutingModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: JokesService,
          useValue: jokesServiceMock
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service method for fetch data on init', () => {
    const jokesService = TestBed.get(JokesService);
    spyOn(jokesService, 'fetchRandomJokes').and.returnValue(of([fakeJoke]));
    component.ngOnInit();
    expect(jokesService.fetchRandomJokes).toHaveBeenCalled();
    expect(component.jokes).toEqual([fakeJoke]);
  });

  it('should call service method for fetch favorites data on init', () => {
    const jokesService = TestBed.get(JokesService);
    spyOn(jokesService, 'getFavorites').and.returnValue(of([fakeJoke]));
    component.ngOnInit();
    expect(jokesService.getFavorites).toHaveBeenCalled();
    expect(component.favoriteJokes).toEqual([fakeJoke]);
  });

  describe('makeFavorite', () => {
    it('should show no alerts if favorites list is not full', () => {
      component.makeFavorite(fakeJoke);
      expect(component.showAlert).toBe('');
    })
    it('should show alert if favorites list is full', () => {
      component.favoriteJokes = [fakeJoke, fakeJoke, fakeJoke, fakeJoke, fakeJoke, fakeJoke, fakeJoke, 
        fakeJoke, fakeJoke, fakeJoke];
      component.makeFavorite(fakeJoke);
      expect(component.showAlert).toBe("You can't have more then 10 favorites");
    })
    it('should make passed joke favorite', () => {
      fakeJoke.favorite = false;
      component.makeFavorite(fakeJoke);
      expect(fakeJoke.favorite).toBeTruthy();
    })
    it('should add passed joke to favorites list', () => {
      component.favoriteJokes = [];
      component.makeFavorite(fakeJoke);
      expect(component.favoriteJokes.length).toBe(1);
    })
    it('should call service method', () => {
      const jokesService = TestBed.get(JokesService);
      spyOn(jokesService, 'saveFavoriteJoke').and.returnValue(of());;
      component.makeFavorite(fakeJoke);
      expect(jokesService.saveFavoriteJoke).toHaveBeenCalled();
    })
  });

  describe('removeFavorite', () => {
    it('should make passed joke not favorite', () => {
      fakeJoke.favorite = true;
      component.removeFavorite(fakeJoke);
      expect(fakeJoke.favorite).toBeFalsy();
    })

    it('should hide alert', () => {
      component.showAlert = "You can't have more then 10 favorites";
      component.removeFavorite(fakeJoke);
      expect(component.showAlert).toBeFalsy();
    })

    it('should remove passed joke from favorites', () => {
      component.favoriteJokes = [fakeJoke];
      component.removeFavorite(fakeJoke);
      expect(component.favoriteJokes.length).toBeFalsy();
    })

    it('should call service method', () => {
      const jokesService = TestBed.get(JokesService);
      spyOn(jokesService, 'removeFavoriteJoke').and.returnValue(of());;
      component.removeFavorite(fakeJoke);
      expect(jokesService.removeFavoriteJoke).toHaveBeenCalled();
    })
  });
});
