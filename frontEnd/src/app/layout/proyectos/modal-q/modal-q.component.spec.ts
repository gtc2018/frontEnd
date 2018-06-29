import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQComponent } from './modal-q.component';

describe('ModalQComponent', () => {
  let component: ModalQComponent;
  let fixture: ComponentFixture<ModalQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
