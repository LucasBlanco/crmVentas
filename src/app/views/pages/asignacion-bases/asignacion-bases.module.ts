import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { OperadoresService } from '@servicios/operadores.service';
import { MatButtonModule } from '@angular/material/button';
import { FuentesService } from './../../services/fuentes.service';
import { AsignacionOperadorComponent } from './asignacion-operador/asignacion-operador.component';
import { FuentesComponent } from './fuentes/fuentes.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginationConfig } from '@baseConfig/table'
import {MatPaginatorIntl} from '@angular/material';
const routes: Routes = [
  { path: 'fuentes', component: FuentesComponent },
  { path: 'operador/:idFuente', component: AsignacionOperadorComponent }
];

@NgModule({
  declarations: [FuentesComponent, AsignacionOperadorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    FuentesService,
    OperadoresService,
    { provide: MatPaginatorIntl, useClass: PaginationConfig}
  ]

})
export class AsignacionBasesModule { }
