import { TestBed, inject } from '@angular/core/testing';

import { CrearMenuService } from './crear-menu.service';

describe('CrearMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearMenuService]
    });
  });

  it('should be created', inject([CrearMenuService], (service: CrearMenuService) => {
    expect(service).toBeTruthy();
  }));
});
