import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PersonaService } from '@servicios/persona.service';
import moment from 'moment';

@Component({
  selector: 'crm-formulario-alta-telefonos',
  templateUrl: './formulario-alta-telefonos.component.html',
  styleUrls: ['./formulario-alta-telefonos.component.scss']
})
export class FormularioAltaTelefonosComponent implements OnInit {

  constructor(private personaSrv: PersonaService) { }

  horaDesdePrevioAHoraHasta: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    console.log('funciona');
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
  }, { validators: this.horaDesdePrevioAHoraHasta });

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



}
