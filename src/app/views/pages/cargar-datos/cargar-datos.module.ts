import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';

import { FormularioAbmTelefonosComponent } from './formulario-abm-telefonos/formulario-abm-telefonos.component';
import { FormularioAltaTelefonosComponent } from './formulario-alta-telefonos/formulario-alta-telefonos.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
  {
    path: '', component: FormularioComponent,
    children: [
      { path: '', redirectTo: 'abmTelefonos', pathMatch: 'full' },
      { path: 'abmTelefonos', component: FormularioAbmTelefonosComponent },
      { path: 'altaTelefonos', component: FormularioAltaTelefonosComponent }
    ]
  }
];

@NgModule({
  declarations: [FormularioComponent, FormularioAbmTelefonosComponent, FormularioAltaTelefonosComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ]
})
export class CargarDatosModule { }
