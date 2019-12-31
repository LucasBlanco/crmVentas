import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DistribucionComponent } from './distribucion/distribucion.component';
import { MatSliderModule, MatInputModule, MatCardModule, MatDividerModule, MatButtonModule, MatFormFieldModule } from '@angular/material';

const routes: Routes = [
  { path: 'distribucion', component: DistribucionComponent }
];

@NgModule({
  declarations: [DistribucionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSliderModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class AdministracionDBModule { }
