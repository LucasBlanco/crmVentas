import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupervisorCallComponent } from './supervisor-call/supervisor-call.component';
import { VendedorCallComponent } from './vendedor-call/vendedor-call.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { ChartComponent } from '../../components/chart/chart.component';
import { WidgetComponent } from "./widget/widget.component";

const routes: Routes = [
  { path: 'supervisorcall', component: SupervisorCallComponent },
  { path: 'vendedorcall', component: VendedorCallComponent }
];

@NgModule({
  declarations: [SupervisorCallComponent, ChartComponent, WidgetComponent, VendedorCallComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class DashboardPostaModule { }
