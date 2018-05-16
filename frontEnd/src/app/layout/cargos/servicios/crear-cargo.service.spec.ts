import { TestBed, inject } from '@angular/core/testing';

import { CrearCargoService } from './crear-cargo.service';

describe('CrearCargoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearCargoService]
    });
  });

  it('should be created', inject([CrearCargoService], (service: CrearCargoService) => {
    expect(service).toBeTruthy();
  }));
});
 