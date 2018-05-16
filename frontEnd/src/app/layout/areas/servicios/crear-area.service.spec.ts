import { TestBed, inject } from '@angular/core/testing';

import { CrearAreaService } from './crear-area.service';

describe('CrearAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearAreaService]
    });
  });

  it('should be created', inject([CrearAreaService], (service: CrearAreaService) => {
    expect(service).toBeTruthy();
  }));
});
 