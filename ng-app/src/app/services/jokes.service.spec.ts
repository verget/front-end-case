import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JokesService } from './jokes.service';
import { HttpClientModule } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { fakeJoke } from '../mocks/fakeJoke';

describe('JokesService', () => {
  let http: HttpTestingController;
  let service: JokesService;
  const baseUrl: string = environment.apiUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        JokesService
      ]
    });
    service = TestBed.get(JokesService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchRandomJokes should make request to expected url', () => {
    service.fetchRandomJokes(10).subscribe();
    const url = `${baseUrl}/jokes?count=10`;
    const req = http.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([fakeJoke]);
  })

  it('saveFavoriteJoke should make request to expected url', () => {
    service.saveFavoriteJoke(10).subscribe();
    const url = `${baseUrl}/favorite`;
    const req = http.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('true');
  })

  it('removeFavoriteJoke should make request to expected url', () => {
    service.removeFavoriteJoke(10).subscribe();
    const url = `${baseUrl}/favorite?id=10`;
    const req = http.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush('true');
  })

  it('getFavorites should make request to expected url', () => {
    service.getFavorites().subscribe();
    const url = `${baseUrl}/favorites`;
    const req = http.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush('true');
  })
});
