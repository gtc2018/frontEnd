import { TestBed, inject } from '@angular/core/testing';

import { CrearHerramientaService } from './crear-herramienta.service';

describe('CrearHerramientaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearHerramientaService]
    });
  });

  it('should be created', inject([CrearHerramientaService], (service: CrearHerramientaService) => {
    expect(service).toBeTruthy();
  }));
});
 