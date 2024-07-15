import { TestBed } from '@angular/core/testing';

import { MyflixService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: MyflixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyflixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
