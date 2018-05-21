import { TestBed, inject } from '@angular/core/testing';

import { HerramientaService } from './herramienta.service';

describe('HerramientaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HerramientaService]
    });
  });

  it('should be created', inject([HerramientaService], (service: HerramientaService) => {
    expect(service).toBeTruthy();
  }));
});
