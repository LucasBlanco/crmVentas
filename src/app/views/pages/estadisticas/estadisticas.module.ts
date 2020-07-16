import { MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';
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
    MatInputModule
  ]
})
export class EstadisticasModule { }
