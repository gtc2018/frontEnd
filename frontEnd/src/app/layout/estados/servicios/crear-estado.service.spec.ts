import { TestBed, inject } from '@angular/core/testing';

import { CrearEstadoService } from './crear-estado.service';

describe('CrearEstadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearEstadoService]
    });
  });

  it('should be created', inject([CrearEstadoService], (service: CrearEstadoService) => {
    expect(service).toBeTruthy();
  }));
});
 