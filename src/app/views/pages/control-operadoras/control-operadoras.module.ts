import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatSortModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
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
		MatSortModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		FormsModule
	]
})
export class ControlOperadorasModule { }
