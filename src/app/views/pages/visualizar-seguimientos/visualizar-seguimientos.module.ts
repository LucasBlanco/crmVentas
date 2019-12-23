import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroTablaComponent } from './filtro-tabla/filtro-tabla.component';
import { MatCardModule } from '@angular/material/card';
import {ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {RouterModule, Routes} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
	{ path: '', component: FiltroTablaComponent},
];


@NgModule({
  declarations: [FiltroTablaComponent],
  imports: [
	  RouterModule.forChild(routes),
	  CommonModule,
	  MatCardModule,
	  ReactiveFormsModule,
	MatFormFieldModule,
	  MatSelectModule,
	  MatInputModule,
	  MatButtonModule,
	  MatDatepickerModule,
	  MatTableModule
  ]
})
export class VisualizarSeguimientosModule { }
