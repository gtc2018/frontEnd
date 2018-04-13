import { TestBed, inject } from '@angular/core/testing';

import { CrearItemService } from './crear-item.service';

describe('CrearItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearItemService]
    });
  });

  it('should be created', inject([CrearItemService], (service: CrearItemService) => {
    expect(service).toBeTruthy();
  }));
});
