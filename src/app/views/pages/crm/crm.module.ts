import { ModalALlamarComponent } from './grid/columnas/columna-a-llamar/modal-a-llamar/modal-a-llamar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CardALlamarComponent } from './grid/columnas/columna-a-llamar/card-a-llamar/card-a-llamar.component';
import { ColumnaALlamarComponent } from './grid/columnas/columna-a-llamar/columna-a-llamar.component';
import { ColumnaAgendadoComponent } from './grid/columnas/columna-agendado/columna-agendado.component';
import { ColumnaRellamarComponent } from './grid/columnas/columna-rellamar/columna-rellamar.component';
import { BaseCardComponent } from './grid/columnas/base-card/base-card.component';
import { CardAgendadoComponent } from './grid/columnas/columna-agendado/card-agendado/card-agendado.component';
import { CardRellamarComponent } from './grid/columnas/columna-rellamar/card-rellamar/card-rellamar.component';
import { BaseModalComponent } from './grid/columnas/base-modal/base-modal.component';
import { NgbAlertConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalAgendadoComponent } from './grid/columnas/columna-agendado/modal-agendado/modal-agendado.component';
import { ModalRellamarComponent } from './grid/columnas/columna-rellamar/modal-rellamar/modal-rellamar.component';
import { BaseCardConHorarioComponent } from './grid/columnas/base-card-con-horario/base-card-con-horario.component';

@NgModule({
  declarations: [
    GridComponent,
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
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: GridComponent
      },
    ]),
  ]
})
export class CrmModule { }
