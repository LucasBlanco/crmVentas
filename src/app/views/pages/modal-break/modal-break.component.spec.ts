import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBreakComponent } from './modal-break.component';

describe('ModalBreakComponent', () => {
  let component: ModalBreakComponent;
  let fixture: ComponentFixture<ModalBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
