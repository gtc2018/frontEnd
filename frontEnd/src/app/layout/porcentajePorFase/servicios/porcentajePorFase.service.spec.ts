import { TestBed, inject } from '@angular/core/testing';

import { PorcentajePorFaseService } from './porcentajePorFase.service';

describe('CargoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PorcentajePorFaseService]
    });
  });

  it('should be created', inject([PorcentajePorFaseService], (service: PorcentajePorFaseService) => {
    expect(service).toBeTruthy();
  }));
});
