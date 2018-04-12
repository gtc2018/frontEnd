import { TestBed, inject } from '@angular/core/testing';

import { CrearRolService } from './crear-rol.service';

describe('CrearRolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearRolService]
    });
  });

  it('should be created', inject([CrearRolService], (service: CrearRolService) => {
    expect(service).toBeTruthy();
  }));
});
 