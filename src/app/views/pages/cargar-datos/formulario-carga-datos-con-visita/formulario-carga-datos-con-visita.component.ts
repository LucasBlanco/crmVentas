import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '@servicios/persona.service';

import { FormularioCargaDatosComponent } from './../formulario-carga-datos/formulario-carga-datos.component';

@Component({
  selector: 'crm-formulario-carga-datos-con-visita',
  templateUrl: '../formulario-carga-datos/formulario-carga-datos.component.html'
})
export class FormularioCargaDatosConVisitaComponent extends FormularioCargaDatosComponent {

  constructor(private _personaService: PersonaService, private router: Router) {
    super(_personaService);

  }
  guardar() {
    this.formPersona.markAllAsTouched();
    this.formTelefonos.markAllAsTouched();

    if (this.formPersona.valid && this.formTelefonos.valid) {
      const persona = this.formPersonaComponent.mapFormToPersona();
      const telefonos = this.formTelefonosComponent.mapFormToTelefonos();
      persona.telefonos = telefonos;
      this.personaService.crearYObtenerIdVenta(persona).subscribe({
        next: (idVenta) => {
          this.formPersona.reset();
          this.formTelefonos.reset();
          this.router.navigate(['cargarVisita/' + idVenta]);
        }
      });
    }
  }

}
