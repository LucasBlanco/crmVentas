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
import { LandingComponent } from '../landing/landing.component';
import { Guard } from './Guard';
import { SupervisorCallComponent } from './supervisor-call/supervisor-call.component';
import { VendedoraComponent } from './vendedora/vendedora.component';
import { WidgetComponent } from './widget/widget.component';

const dashboard = () => {


};

const routes: Routes = [
	{ path: 'supervisorcall', component: SupervisorCallComponent, canActivate: [Guard] },
	{ path: 'vendedora/:id', component: VendedoraComponent, canActivate: [Guard] },
	{ path: 'landing', component: LandingComponent, canActivate: [Guard] }
];

@NgModule({
	declarations: [SupervisorCallComponent, ChartComponent, WidgetComponent, VendedoraComponent, LandingComponent],
	providers: [Guard],
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
export class DashboardPostaModule {
}
