import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';

import { ChartComponent } from '../../components/chart/chart.component';
import { UserService } from './../../services/user.service';
import { SupervisorCallComponent } from './supervisor-call/supervisor-call.component';
import { VendedoraComponent } from './vendedora/vendedora.component';
import { WidgetComponent } from './widget/widget.component';

const dashboard = () => {
  const user = new UserService().getCurrentUser();
  const esSupervisor = user.perfiles.some(p => p.toLocaleLowerCase() === 'supervisor call');
  const esOperador = user.perfiles.some(p => p.toLocaleLowerCase() === 'operador venta');
  const id = user.id;
  return esSupervisor ? '/supervisorcall'
    : esOperador ? '/vendedora/' + id : '/supervisorcall';
};

const routes: Routes = [
  { path: 'supervisorcall', component: SupervisorCallComponent },
  { path: 'vendedora/:id', component: VendedoraComponent },
  { path: '', redirectTo: dashboard(), pathMatch: 'full' }
];

@NgModule({
  declarations: [SupervisorCallComponent, ChartComponent, WidgetComponent, VendedoraComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DashboardPostaModule { }
