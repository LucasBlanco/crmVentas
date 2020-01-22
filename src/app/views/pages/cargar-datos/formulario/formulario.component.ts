import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Localidad } from '@modelos/localidad';
import { Persona } from '@modelos/persona';
import { LocalidadesService } from '@servicios/localidades.service';
import { PersonaService } from '@servicios/persona.service';
import * as moment from 'moment';

import { ChildForm } from './../childForm';

@Component({
  selector: 'crm-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  @Output() guardar = new EventEmitter();
  @Input() persona: Persona;
  form = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    apellido: new FormControl(null, Validators.required),
    nacionalidad: new FormControl(null),
    cuil: new FormControl(null, [Validators.min(11111111111), Validators.max(99999999999)]),
    sexo: new FormControl(null),
    estadoCivil: new FormControl(null),
    fechaNacimiento: new FormControl(null),
    telefonos: new FormArray([this.crearTelefonoVacio()]),
    capitas: new FormControl(null),
    calle: new FormControl(null),
    numero: new FormControl(null),
    piso: new FormControl(null),
    departamento: new FormControl(null),
    localidad: new FormControl(null),
    codigoPostal: new FormControl(null),
  });

  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get nacionalidad() { return this.form.get('nacionalidad'); }
  get cuil() { return this.form.get('cuil'); }
  get sexo() { return this.form.get('sexo'); }
  get estadoCivil() { return this.form.get('estadoCivil'); }
  get fechaNacimiento() { return this.form.get('fechaNacimiento'); }
  get capitas() { return this.form.get('capitas'); }
  get calle() { return this.form.get('calle'); }
  get numero() { return this.form.get('numero'); }
  get piso() { return this.form.get('piso'); }
  get departamento() { return this.form.get('departamento'); }
  get localidad() { return this.form.get('localidad'); }
  get codigoPostal() { return this.form.get('codigoPostal'); }
  get telefonos() { return this.form.get('telefonos') as FormArray; }

  localidades: Localidad[] = [];
  indiceTelefonoEditandose: number = null;
  indiceTelefonoCreandose: number = null;
  childForm: ChildForm;
  constructor(private localidadSrv: LocalidadesService, private personaSrv: PersonaService) { }


  onActivate(childForm) {
    this.childForm = childForm;
  }

  ngOnInit() {
    this.localidadSrv.traerTodos().subscribe(localidades => this.localidades = localidades);
  }

  crearTelefonoVacio() {
    return new FormGroup({
      telefono: new FormControl(null, Validators.required),
      horaDesde: new FormControl(null, Validators.required),
      horaHasta: new FormControl(null, Validators.required)
    });
  }

  fechaHoy = () => moment().format('YYYY-MM-DDThh:mm');

  vender = () => {
    console.log('DATOS', this.form.value);
    this.guardar.emit(this.form.value);
  };

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
    const telefono = this.telefonos.at(this.indiceTelefonoEditandose);
    const index = this.indiceTelefonoEditandose;
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
    const telefono = this.telefonos.at(this.indiceTelefonoEditandose);
    const index = this.indiceTelefonoEditandose;
    this.personaSrv.editarTelefono(index, telefono).subscribe(
      () => {
        this.indiceTelefonoCreandose = null;
      }
    );
  };



}
