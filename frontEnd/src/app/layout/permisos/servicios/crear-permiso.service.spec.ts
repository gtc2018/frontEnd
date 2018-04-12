import { TestBed, inject } from '@angular/core/testing';

import { CrearPermisoService } from './crear-permiso.service';

describe('CrearPermisoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearPermisoService]
    });
  });

  it('should be created', inject([CrearPermisoService], (service: CrearPermisoService) => {
    expect(service).toBeTruthy();
  }));
});
