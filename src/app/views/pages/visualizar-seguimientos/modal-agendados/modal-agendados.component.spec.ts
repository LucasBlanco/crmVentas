import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgendadosComponent } from './modal-agendados.component';

describe('ModalAgendadosComponent', () => {
  let component: ModalAgendadosComponent;
  let fixture: ComponentFixture<ModalAgendadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgendadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
