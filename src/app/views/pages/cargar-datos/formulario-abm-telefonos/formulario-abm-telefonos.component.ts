import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PersonaService } from '@servicios/persona.service';
import * as moment from 'moment';

import { ChildForm } from '../childForm';

@Component({
  selector: 'crm-formulario-abm-telefonos',
  templateUrl: './formulario-abm-telefonos.component.html',
  styleUrls: ['./formulario-abm-telefonos.component.scss']
})
export class FormularioAbmTelefonosComponent implements OnInit, ChildForm {


  indiceTelefonoEditandose: number = null;
  indiceTelefonoCreandose: number = null;
  rollbackTelefono: number = null;
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
  });


  validarTelefonoGuardado(control: AbstractControl) {
    if (this.indiceTelefonoCreandose !== null || this.indiceTelefonoEditandose !== null) {
      return { pendienteGuardado: true };
    }
    return null;
  }

  crearTelefonoVacio() {
    return new FormGroup({
      telefono: new FormControl(null, [Validators.required, this.validarTelefonoGuardado.bind(this)]),
      horaDesde: new FormControl(null, [Validators.required, this.validarTelefonoGuardado.bind(this)]),
      horaHasta: new FormControl(null, [Validators.required, this.validarTelefonoGuardado.bind(this)])
    }, { validators: this.horaDesdePrevioAHoraHasta });
  }

  get contactos() { return this.form.get('contactos') as FormArray; }
  telefono(index) { return this.contactos.controls[index].get('telefono'); }
  horaDesde(index) { return this.contactos.controls[index].get('horaDesde'); }
  horaHasta(index) { return this.contactos.controls[index].get('horaHasta'); }

  telefonoCompleto(index) {
    return !this.telefono(index).hasError('required')
      && !this.horaDesde(index).hasError('required')
      && !this.horaHasta(index).hasError('required');
  }

  cargarTelefonos(telefonos: { telefono, horaDesde, horaHasta; }[]) {
    this.form.setControl('contactos', new FormArray(
      telefonos.map(t => {
        const tel = this.crearTelefonoVacio();
        tel.patchValue(t);
        return tel;
      })
    ));
  }

  ngOnInit() {

  }

  agregarTelefono = () => {
    this.contactos.push(this.crearTelefonoVacio());
    this.indiceTelefonoCreandose = this.contactos.length - 1;
  };

  borrarTelefono = (index) => {
    this.personaSrv.borrarTelefono(index).subscribe(
      () => this.contactos.removeAt(index)
    );
  };

  inputEditable(i) {
    if (this.indiceTelefonoCreandose !== null) {
      return this.esUnTelefonoNuevo(i);
    }
    if (this.indiceTelefonoEditandose !== null) {
      return this.indiceTelefonoEditandose === i;
    }
    return false;
  }

  get telefonosGuardados() {
    return this.indiceTelefonoCreandose === null && this.indiceTelefonoEditandose === null;
  }

  esUnTelefonoNuevo(indice) { return this.indiceTelefonoCreandose === indice; }

  seleccionarTelefonoParaEditar = (indice) => {
    this.indiceTelefonoEditandose = indice;
    this.rollbackTelefono = this.contactos.at(indice).value;
  };

  cancelarEdicion = () => {
    this.contactos.at(this.indiceTelefonoEditandose).setValue(this.rollbackTelefono);
    this.indiceTelefonoEditandose = null;
    this.rollbackTelefono = null;
    this.validarContactos();
  };

  cancelarCreacion = () => {
    this.contactos.removeAt(this.contactos.length - 1);
    this.indiceTelefonoCreandose = null;
  };

  editarTelefono = () => {
    const index = this.indiceTelefonoEditandose;
    const telefono = this.contactos.at(index).value;
    this.personaSrv.editarTelefono(index, telefono).subscribe(
      () => {
        this.contactos.removeAt(index);
        const nuevoTelefono = this.crearTelefonoVacio();
        nuevoTelefono.patchValue(telefono);
        this.contactos.insert(index, nuevoTelefono);
        this.indiceTelefonoEditandose = null;
      }
    );
  };

  crearTelefono = () => {
    const telefono = this.contactos.at(this.indiceTelefonoCreandose);
    const index = this.indiceTelefonoCreandose;
    this.personaSrv.editarTelefono(index, telefono).subscribe(
      () => {
        this.indiceTelefonoCreandose = null;
        this.validarContactos();
      }
    );
  };

  validarContactos() {
    this.contactos.value.forEach((_, i) => {
      this.telefono(i).updateValueAndValidity({ onlySelf: true });
      this.telefono(i).markAsUntouched();
      this.horaDesde(i).updateValueAndValidity({ onlySelf: true });
      this.horaDesde(i).markAsUntouched();
      this.horaHasta(i).updateValueAndValidity({ onlySelf: true });
      this.horaHasta(i).markAsUntouched();
    });
  }

}
