import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalidadesService } from '@servicios/localidades.service';
import { PersonaService } from '@servicios/persona.service';

import { FormularioAltaPersonaComponent } from './../formulario-alta-persona/formulario-alta-persona.component';

@Component({
  selector: 'crm-formulario-venta-persona',
  templateUrl: '../formulario-alta-persona/formulario-alta-persona.component.ts'
})
export class FormularioVentaPersonaComponent extends FormularioAltaPersonaComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    apellido: new FormControl(null, Validators.required),
    nacionalidad: new FormControl(null),
    cuil: new FormControl(null, [Validators.min(11111111111), Validators.max(99999999999)]),
    sexo: new FormControl(null),
    estadoCivil: new FormControl(null),
    fechaNacimiento: new FormControl(null),
    capitas: new FormControl(null),
    calle: new FormControl(null),
    numero: new FormControl(null),
    piso: new FormControl(null),
    departamento: new FormControl(null),
    localidad: new FormControl(null),
    codigoPostal: new FormControl(null),
  });

  constructor(private _localidadSrv: LocalidadesService, private _personaSrv: PersonaService) {
    super(_localidadSrv, _personaSrv);
  }

  ngOnInit() {
  }

}
