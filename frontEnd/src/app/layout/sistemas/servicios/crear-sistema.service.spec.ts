import { TestBed, inject } from '@angular/core/testing';

import { CrearSistemaService } from './crear-sistema.service';

describe('CrearSistemaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearSistemaService]
    });
  });

  it('should be created', inject([CrearSistemaService], (service: CrearSistemaService) => {
    expect(service).toBeTruthy();
  }));
});
 