import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Telefono } from '@modelos/telefono';
import { PersonaService } from '@servicios/persona.service';
import moment from 'moment';

@Component({
  selector: 'crm-formulario-alta-telefonos',
  templateUrl: './formulario-alta-telefonos.component.html',
  styleUrls: ['./formulario-alta-telefonos.component.scss']
})
export class FormularioAltaTelefonosComponent implements OnInit {

  groupErrorMatcher = {
    isErrorState(control: FormControl): boolean {
      const controlTouched = !!(control && (control.dirty || control.touched));
      const controlInvalid = !!(control && control.invalid);
      const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));
      return controlTouched && (controlInvalid || parentInvalid);
    }
  };
  constructor(private personaSrv: PersonaService) { }

  horaDesdePrevioAHoraHasta: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const horaDesde = control.get('horaDesde');
    const horaHasta = control.get('horaHasta');
    if (!horaDesde || !horaHasta) { return null; }
    if (moment(horaDesde.value, 'hh:mm').isAfter(moment(horaHasta.value, 'hh:mm'))) {
      return { horaDesdeMayorAHoraHasta: true };
    } else {
      return null;
    }
  };


  // tslint:disable-next-line: member-ordering
  form = new FormGroup({
    contactos: new FormArray([this.crearTelefonoVacio()]),
  });

  get contactos() { return this.form.get('contactos') as FormArray; }

  crearTelefonoVacio() {
    return new FormGroup({
      telefono: new FormControl(null, Validators.required),
      horaDesde: new FormControl(null, Validators.required),
      horaHasta: new FormControl(null, Validators.required)
    }, { validators: this.horaDesdePrevioAHoraHasta });
  }



  ngOnInit() {

  }

  agregarTelefono = () => {
    this.contactos.push(this.crearTelefonoVacio());
  };

  borrarTelefono = (index) => {
    this.contactos.removeAt(index);
  };

  mapFormToTelefonos(): Telefono[] {
    return this.contactos.value.map(t => ({
      numero: t.telefono,
      horarioContacto: {
        desde: t.horaDesde,
        hasta: t.horaHasta
      }
    }));
  }


}
