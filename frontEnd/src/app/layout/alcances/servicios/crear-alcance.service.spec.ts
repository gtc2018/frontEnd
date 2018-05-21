import { TestBed, inject } from '@angular/core/testing';

import { CrearAlcanceService } from './crear-alcance.service';

describe('CrearAlcanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearAlcanceService]
    });
  });

  it('should be created', inject([CrearAlcanceService], (service: CrearAlcanceService) => {
    expect(service).toBeTruthy();
  }));
});
 