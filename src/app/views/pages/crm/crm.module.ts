import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

import { CargarDatosModule } from './../cargar-datos/cargar-datos.module';
import { BaseCardConHorarioComponent } from './grid/columnas/base-card-con-horario/base-card-con-horario.component';
import { BaseCardComponent } from './grid/columnas/base-card/base-card.component';
import { BaseModalComponent } from './grid/columnas/base-modal/base-modal.component';
import { CardALlamarComponent } from './grid/columnas/columna-a-llamar/card-a-llamar/card-a-llamar.component';
import { ColumnaALlamarComponent } from './grid/columnas/columna-a-llamar/columna-a-llamar.component';
import { ModalALlamarComponent } from './grid/columnas/columna-a-llamar/modal-a-llamar/modal-a-llamar.component';
import { CardAgendadoComponent } from './grid/columnas/columna-agendado/card-agendado/card-agendado.component';
import { ColumnaAgendadoComponent } from './grid/columnas/columna-agendado/columna-agendado.component';
import { ModalAgendadoComponent } from './grid/columnas/columna-agendado/modal-agendado/modal-agendado.component';
import { CardRellamarComponent } from './grid/columnas/columna-rellamar/card-rellamar/card-rellamar.component';
import { ColumnaRellamarComponent } from './grid/columnas/columna-rellamar/columna-rellamar.component';
import { ModalRellamarComponent } from './grid/columnas/columna-rellamar/modal-rellamar/modal-rellamar.component';
import { FormularioAgendarComponent } from './grid/columnas/formulario-agendar/formulario-agendar.component';
import { FormularioRechazoComponent } from './grid/columnas/formulario-rechazo/formulario-rechazo.component';
import { FormularioVenderComponent } from './grid/columnas/formulario-vender/formulario-vender.component';
import { GridComponent } from './grid/grid.component';

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
    BaseCardConHorarioComponent,
    FormularioRechazoComponent,
    FormularioAgendarComponent,
    FormularioVenderComponent
  ],
  entryComponents: [ModalALlamarComponent, ModalRellamarComponent, ModalAgendadoComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '',
        component: GridComponent
      },
    ]),
    CargarDatosModule,
  ]
})
export class CrmModule { }
