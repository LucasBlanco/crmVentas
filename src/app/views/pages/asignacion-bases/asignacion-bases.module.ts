import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatPaginatorIntl } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { PaginationConfig } from '@baseConfig/table';
import { FuentesService } from '@servicios/fuentes.service';
import { OperadoresService } from '@servicios/operadores.service';

import { AsignacionOperadorComponent } from './asignacion-operador/asignacion-operador.component';
import { FuentesComponent } from './fuentes/fuentes.component';

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
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [
    FuentesService,
    OperadoresService,
    { provide: MatPaginatorIntl, useClass: PaginationConfig }
  ]

})
export class AsignacionBasesModule { }
