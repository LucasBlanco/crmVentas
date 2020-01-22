import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '@servicios/persona.service';

import { ChildForm } from '../childForm';

@Component({
  selector: 'crm-formulario-abm-telefonos',
  templateUrl: './formulario-abm-telefonos.component.html',
  styleUrls: ['./formulario-abm-telefonos.component.scss']
})
export class FormularioAbmTelefonosComponent implements OnInit, ChildForm {


  indiceTelefonoEditandose: number = null;
  indiceTelefonoCreandose: number = null;
  constructor(private personaSrv: PersonaService) { }
  form = new FormGroup({
    telefonos: new FormArray([this.crearTelefonoVacio()]),
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
    });
  }

  get telefonos() { return this.form.get('telefonos') as FormArray; }
  telefono(index) { return this.telefonos.controls[index].get('telefono'); }
  horaDesde(index) { return this.telefonos.controls[index].get('horaDesde'); }
  horaHasta(index) { return this.telefonos.controls[index].get('horaHasta'); }

  ngOnInit() {
  }

  sayHello() {
    console.log('Hola');
  }

  agregarTelefono = () => {
    this.telefonos.push(this.crearTelefonoVacio());
    this.indiceTelefonoCreandose = this.telefonos.length - 1;
  };

  borrarTelefono = (index) => {
    this.personaSrv.borrarTelefono(index).subscribe(
      () => this.telefonos.removeAt(index)
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
  };

  cancelarEdicion = () => {
    this.indiceTelefonoEditandose = null;
  };

  cancelarCreacion = () => {
    this.telefonos.removeAt(this.telefonos.length - 1);
    this.indiceTelefonoCreandose = null;
  };

  editarTelefono = () => {
    const index = this.indiceTelefonoEditandose;
    const telefono = this.telefonos.at(index).value;
    this.personaSrv.editarTelefono(index, telefono).subscribe(
      () => {
        this.telefonos.removeAt(index);
        const nuevoTelefono = this.crearTelefonoVacio();
        nuevoTelefono.patchValue(telefono);
        this.telefonos.insert(index, nuevoTelefono);
        this.cancelarEdicion();
      }
    );
  };

  crearTelefono = () => {
    const telefono = this.telefonos.at(this.indiceTelefonoCreandose);
    const index = this.indiceTelefonoCreandose;
    this.personaSrv.editarTelefono(index, telefono).subscribe(
      () => {
        this.indiceTelefonoCreandose = null;
        this.telefono(index).updateValueAndValidity({ onlySelf: true });
        this.horaDesde(index).updateValueAndValidity({ onlySelf: true });
        this.horaHasta(index).updateValueAndValidity({ onlySelf: true });
      }
    );
  };

}
