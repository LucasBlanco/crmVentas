import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroTablaComponent } from './filtro-tabla/filtro-tabla.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { RouterModule, Routes } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalAgendadosComponent } from './modal-agendados/modal-agendados.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module
import { MAT_DATE_LOCALE } from '@angular/material';
const routes: Routes = [
	{ path: '', component: FiltroTablaComponent },
];


@NgModule({
	declarations: [FiltroTablaComponent, ModalAgendadosComponent],
	entryComponents: [ModalAgendadosComponent],
	providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		MatCardModule,
		ReactiveFormsModule,
		RxReactiveFormsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatButtonModule,
		MatDatepickerModule,
		MatTableModule,
		MatIconModule,
		MatPaginatorModule,
		MatDialogModule
	]
})
export class VisualizarSeguimientosModule { }
