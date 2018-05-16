import { TestBed, inject } from '@angular/core/testing';

import { CrearPorcentajePorFaseService } from './crear-porcentajePorFase.service';

describe('CrearPorcentajePorFaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearPorcentajePorFaseService]
    });
  });

  it('should be created', inject([CrearPorcentajePorFaseService], (service: CrearPorcentajePorFaseService) => {
    expect(service).toBeTruthy();
  }));
});
 