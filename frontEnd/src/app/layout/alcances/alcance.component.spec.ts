import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcanceComponent } from './alcance.component';

describe('AlcanceComponent', () => {
    let component: AlcanceComponent;
    let fixture: ComponentFixture<AlcanceComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [AlcanceComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AlcanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
