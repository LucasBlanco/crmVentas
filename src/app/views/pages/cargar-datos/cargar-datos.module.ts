import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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

import { BuscadorVentaComponent } from './buscador-venta/buscador-venta.component';
import { CargaVisitaComponent } from './carga-visita/carga-visita.component';
import { FormularioAbmTelefonosComponent } from './formulario-abm-telefonos/formulario-abm-telefonos.component';
import { FormularioAltaPersonaComponent } from './formulario-alta-persona/formulario-alta-persona.component';
import { FormularioAltaTelefonosComponent } from './formulario-alta-telefonos/formulario-alta-telefonos.component';
import {
  FormularioCargaDatosConVisitaComponent,
} from './formulario-carga-datos-con-visita/formulario-carga-datos-con-visita.component';
import { FormularioCargaDatosComponent } from './formulario-carga-datos/formulario-carga-datos.component';
import { FormularioVentaPersonaComponent } from './formulario-venta-persona/formulario-venta-persona.component';
import { FormularioVisitaComponent } from './formulario-visita/formulario-visita.component';
import { VentasPendientesDeVisitaComponent } from './ventas-pendientes-de-visita/ventas-pendientes-de-visita.component';

@NgModule({
  declarations: [
    FormularioAltaPersonaComponent,
    FormularioAbmTelefonosComponent,
    FormularioAltaTelefonosComponent,
    FormularioCargaDatosComponent,
    FormularioVentaPersonaComponent,
    FormularioVisitaComponent,
    FormularioCargaDatosConVisitaComponent,
    CargaVisitaComponent,
    BuscadorVentaComponent,
    VentasPendientesDeVisitaComponent
  ],
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
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    FormularioAbmTelefonosComponent,
    FormularioAltaTelefonosComponent,
    FormularioAltaPersonaComponent,
    FormularioVentaPersonaComponent
  ],
  entryComponents: [
    CargaVisitaComponent
  ]
})
export class CargarDatosModule { }
