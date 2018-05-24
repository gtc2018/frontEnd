import { TestBed, inject } from '@angular/core/testing';

import { CrearRegistroActividadService } from './crear-registroActividad.service';

describe('CrearRegistroActividadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearRegistroActividadService]
    });
  });

  it('should be created', inject([CrearRegistroActividadService], (service: CrearRegistroActividadService) => {
    expect(service).toBeTruthy();
  }));
});
 