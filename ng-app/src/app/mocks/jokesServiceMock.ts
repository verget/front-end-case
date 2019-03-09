import { fakeJoke } from './fakeJoke';
import { of } from 'rxjs';

export const jokesServiceMock = {
    fetchRandomJokes: (count: number) => of([fakeJoke]),
    getFavorites: () => of([fakeJoke]),
    saveFavoriteJoke: (id: number) => of(),
    removeFavoriteJoke: (id: number) => of(),
};