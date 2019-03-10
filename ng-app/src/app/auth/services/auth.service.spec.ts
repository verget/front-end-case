import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let http: HttpTestingController;
  let service: AuthService;
  const baseUrl: string = environment.apiUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService
      ]
    });
    service = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registration should make request to expected url', () => {
    service.registration('abc', 'abc', 'abc').subscribe();
    const url = `${baseUrl}/register`;
    const req = http.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('');
  });

  it('login should make request to expected url', () => {
    service.login('abc', 'abc').subscribe();
    const url = `${baseUrl}/login`;
    const req = http.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('');
  });
});
