import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormularioAltaPersonaComponent } from './../formulario-alta-persona/formulario-alta-persona.component';
import { FormularioAltaTelefonosComponent } from './../formulario-alta-telefonos/formulario-alta-telefonos.component';

@Component({
  selector: 'crm-formulario-carga-datos',
  templateUrl: './formulario-carga-datos.component.html',
  styleUrls: ['./formulario-carga-datos.component.scss']
})
export class FormularioCargaDatosComponent implements OnInit {

  formPersona: FormGroup;
  formTelefonos: FormGroup;
  @ViewChild(FormularioAltaPersonaComponent, { static: true }) formPersonaComponent: FormularioAltaPersonaComponent;
  @ViewChild(FormularioAltaTelefonosComponent, { static: true }) formTelefonosComponent: FormularioAltaTelefonosComponent;

  constructor() { }

  ngAfterContentInit() {
    this.formPersona = this.formPersonaComponent.form;
    this.formTelefonos = this.formTelefonosComponent.form;
  }

  ngOnInit() {
  }

  guardar() {
    console.log('persona', this.formPersona.value);
    console.log('telefonos', this.formTelefonos.value);
  }
}
