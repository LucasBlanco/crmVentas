import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCardConHorarioComponent } from './columnas/base-card-con-horario/base-card-con-horario.component';
import { BaseCardComponent } from './columnas/base-card/base-card.component';
import { BaseModalComponent } from './columnas/base-modal/base-modal.component';
import { CardALlamarComponent } from './columnas/columna-a-llamar/card-a-llamar/card-a-llamar.component';
import { ColumnaALlamarComponent } from './columnas/columna-a-llamar/columna-a-llamar.component';
import { ModalALlamarComponent } from './columnas/columna-a-llamar/modal-a-llamar/modal-a-llamar.component';
import { CardAgendadoComponent } from './columnas/columna-agendado/card-agendado/card-agendado.component';
import { ColumnaAgendadoComponent } from './columnas/columna-agendado/columna-agendado.component';
import { ModalAgendadoComponent } from './columnas/columna-agendado/modal-agendado/modal-agendado.component';
import { CardRellamarComponent } from './columnas/columna-rellamar/card-rellamar/card-rellamar.component';
import { ColumnaRellamarComponent } from './columnas/columna-rellamar/columna-rellamar.component';
import { ModalRellamarComponent } from './columnas/columna-rellamar/modal-rellamar/modal-rellamar.component';
import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent,
        ColumnaALlamarComponent,
        CardALlamarComponent,
        ColumnaAgendadoComponent,
        ColumnaRellamarComponent,
        BaseCardComponent,
        CardAgendadoComponent,
        CardRellamarComponent,
        ModalALlamarComponent,
        BaseModalComponent,
        ModalAgendadoComponent,
        ModalRellamarComponent,
        BaseCardConHorarioComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
