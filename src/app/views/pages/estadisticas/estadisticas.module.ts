import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';

import { ChartComponent } from '../../components/chart/chart.component';
import { LandingComponent } from '../landing/landing.component';
import { EstadisiticasBaseComponent } from './estadisiticas-base/estadisiticas-base.component';
import { SupervisorCallComponent } from './supervisor-call/supervisor-call.component';
import { VendedoraComponent } from './vendedora/vendedora.component';
import { WidgetComponent } from './widget/widget.component';
import { BuscardorBaseComponent } from './estadisiticas-base/buscardor-base/buscardor-base.component';

const routes: Routes = [
	{ path: 'landing', component: LandingComponent },
	{ path: 'base', component: EstadisiticasBaseComponent }
];

@NgModule({
	declarations: [SupervisorCallComponent, ChartComponent, WidgetComponent, VendedoraComponent, LandingComponent, EstadisiticasBaseComponent, BuscardorBaseComponent],
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
		MatIconModule,
		MatTabsModule,
		MatProgressSpinnerModule,
		MatProgressBarModule
	]
})
export class EstadisticasModule {
}
