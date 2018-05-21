import { TestBed, inject } from '@angular/core/testing';

import { AlcanceService } from './alcance.service';

describe('AlcanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlcanceService]
    });
  });

  it('should be created', inject([AlcanceService], (service: AlcanceService) => {
    expect(service).toBeTruthy();
  }));
});
