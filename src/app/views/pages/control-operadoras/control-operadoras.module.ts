import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaControlComponent } from './tabla-control/tabla-control.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule, MatTableModule} from "@angular/material";
import {MatChipsModule} from "@angular/material/chips";
import {MatPaginatorModule} from "@angular/material/paginator";


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
	  MatChipsModule
  ]
})
export class ControlOperadorasModule { }
