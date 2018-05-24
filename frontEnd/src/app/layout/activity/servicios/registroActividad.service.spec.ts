import { TestBed, inject } from '@angular/core/testing';

import { RegistroActividadService } from './registroActividad.service';

describe('RegistroActividadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroActividadService]
    });
  });

  it('should be created', inject([RegistroActividadService], (service: RegistroActividadService) => {
    expect(service).toBeTruthy();
  }));
});
