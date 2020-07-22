import { FormsModule } from '@angular/forms';
import { MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ChartComponent } from './components/chart/chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';


@NgModule({
  declarations: [EstadisticasComponent, ChartComponent],
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class EstadisticasModule { }
