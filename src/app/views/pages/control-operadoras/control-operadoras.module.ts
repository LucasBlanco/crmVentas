import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatSortModule, MatTableModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule, Routes } from '@angular/router';

import { TablaControlComponent } from './tabla-control/tabla-control.component';


const routes: Routes = [
	{ path: '', component: TablaControlComponent }
];
@NgModule({
	declarations: [TablaControlComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatCardModule,
		MatTableModule,
		MatPaginatorModule,
		MatChipsModule,
		MatSortModule
	]
})
export class ControlOperadorasModule { }
