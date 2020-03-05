import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalidadesService } from '@servicios/localidades.service';

import { FormularioAltaPersonaComponent } from './../formulario-alta-persona/formulario-alta-persona.component';

@Component({
  selector: 'crm-formulario-venta-persona',
  templateUrl: '../formulario-alta-persona/formulario-alta-persona.component.html'
})
export class FormularioVentaPersonaComponent extends FormularioAltaPersonaComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    apellido: new FormControl(null, Validators.required),
    nacionalidad: new FormControl(null, Validators.required),
    cuil: new FormControl(null, [Validators.required, Validators.min(11111111111), Validators.max(99999999999)]),
    sexo: new FormControl(null, Validators.required),
    estadoCivil: new FormControl(null, Validators.required),
    fechaNacimiento: new FormControl(null, Validators.required),
    capitas: new FormControl(null),
    calle: new FormControl(null, Validators.required),
    numero: new FormControl(null, Validators.required),
    piso: new FormControl(null),
    departamento: new FormControl(null),
    localidad: new FormControl(null, Validators.required),
    codigoPostal: new FormControl(null, Validators.required)
  });

  constructor(private _localidadSrv: LocalidadesService) {
    super(_localidadSrv);
  }

}
