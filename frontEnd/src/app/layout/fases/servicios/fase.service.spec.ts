import { TestBed, inject } from '@angular/core/testing';

import { FaseService } from './fase.service';

describe('FaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaseService]
    });
  });

  it('should be created', inject([FaseService], (service: FaseService) => {
    expect(service).toBeTruthy();
  }));
});
