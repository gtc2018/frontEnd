import { TestBed, inject } from '@angular/core/testing';

import { CrearTareaService } from './crear-tarea.service';

describe('CrearTareaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearTareaService]
    });
  });

  it('should be created', inject([CrearTareaService], (service: CrearTareaService) => {
    expect(service).toBeTruthy();
  }));
});
 