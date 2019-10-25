import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgendadoComponent } from './modal-agendado.component';

describe('ModalAgendadoComponent', () => {
  let component: ModalAgendadoComponent;
  let fixture: ComponentFixture<ModalAgendadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgendadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgendadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
