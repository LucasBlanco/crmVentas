import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  MatSliderModule, MatInputModule, MatCardModule, MatDividerModule, MatButtonModule, MatFormFieldModule
  , MatTableModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { ListadoComponent } from './listado/listado.component';
import { EditComponent } from './listado/mat-dialogs/edit/edit.component';
import { DeleteComponent } from './listado/mat-dialogs/delete/delete.component';
import { InfoComponent } from './listado/mat-dialogs/info/info.component';
import { ChangeComponent } from './listado/mat-dialogs/change/change.component';
import { AddComponent } from './listado/mat-dialogs/add/add.component';

const routes: Routes = [
  { path: '', component: ListadoComponent }
];

@NgModule({
  declarations: [ListadoComponent, EditComponent, DeleteComponent, InfoComponent
    , ChangeComponent, AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSliderModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule
  ],
  entryComponents: [DeleteComponent, InfoComponent, EditComponent, ChangeComponent, AddComponent]
})
export class AdministracionDBModule { }
