import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonaService } from '@servicios/persona.service';

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

  constructor(public personaService: PersonaService) {
  }

  ngAfterContentInit() {
    this.formPersona = this.formPersonaComponent.form;
    this.formTelefonos = this.formTelefonosComponent.form;
  }

  ngOnInit() {
  }

  guardar() {
    this.formPersona.markAllAsTouched();
    this.formTelefonos.markAllAsTouched();

    if (this.formPersona.valid && this.formTelefonos.valid) {
      const persona = this.formPersonaComponent.mapFormToPersona();
      const telefonos = this.formTelefonosComponent.mapFormToTelefonos();
      persona.telefonos = telefonos;
      this.personaService.crear(persona).subscribe({
        next: () => { this.formPersona.reset(); this.formTelefonos.reset(); }
      });
    }
  }
}

