import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCardConHorarioComponent } from '../base-card-con-horario/base-card-con-horario.component';
import { BaseCardComponent } from '../base-card/base-card.component';
import { CardAgendadoComponent } from './card-agendado/card-agendado.component';
import { ColumnaAgendadoComponent } from './columna-agendado.component';
import { ModalAgendadoComponent } from './modal-agendado/modal-agendado.component';

describe('ColumnaAgendadoComponent', () => {
  let component: ColumnaAgendadoComponent;
  let fixture: ComponentFixture<ColumnaAgendadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColumnaAgendadoComponent,
        CardAgendadoComponent,
        ModalAgendadoComponent,
        BaseCardComponent,
        BaseCardConHorarioComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnaAgendadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
