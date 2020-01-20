import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Localidad } from '@modelos/localidad';
import { Persona } from '@modelos/persona';
import { LocalidadesService } from '@servicios/localidades.service';
import * as moment from 'moment';

@Component({
  selector: 'crm-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  @Output() guardar = new EventEmitter();
  @Input() persona: Persona;
  public counterId = 0;
  public listaContactos = [{
    telefono: null,
    desde: null,
    hasta: null,
    id: this.counterId
  }];
  form = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    apellido: new FormControl(null, Validators.required),
    nacionalidad: new FormControl(null),
    cuil: new FormControl(null, [Validators.min(11111111111), Validators.max(99999999999)]),
    sexo: new FormControl(null),
    estadoCivil: new FormControl(null),
    fechaNacimiento: new FormControl(null),
    horaDesde0: new FormControl(null, Validators.required),
    horaHasta0: new FormControl(null, Validators.required),
    telefono0: new FormControl(null, Validators.required),
    capitas: new FormControl(null),
    calle: new FormControl(null),
    numero: new FormControl(null),
    piso: new FormControl(null),
    departamento: new FormControl(null),
    localidad: new FormControl(null),
    codigoPostal: new FormControl(null),

  });


  get nombre() { return this.form.get('nombre') }
  get apellido() { return this.form.get('apellido') }
  get nacionalidad() { return this.form.get('nacionalidad') }
  get cuil() { return this.form.get('cuil') }
  get sexo() { return this.form.get('sexo') }
  get estadoCivil() { return this.form.get('estadoCivil') }
  get fechaNacimiento() { return this.form.get('fechaNacimiento') }
  get capitas() { return this.form.get('capitas') }
  get calle() { return this.form.get('calle') }
  get numero() { return this.form.get('numero') }
  get piso() { return this.form.get('piso') }
  get departamento() { return this.form.get('departamento') }
  get localidad() { return this.form.get('localidad') }
  get codigoPostal() { return this.form.get('codigoPostal') }

  localidades: Localidad[] = [];
  constructor(private localidadSrv: LocalidadesService) { }

  ngOnInit() {
    this.localidadSrv.traerTodos().subscribe(localidades => this.localidades = localidades)
  }

  fechaHoy() {
    return moment().format("YYYY-MM-DDThh:mm");
  }

  vender() {
    this.guardar.emit(this.form.value);
    console.log(this.form.value)
  }

  agregarTelefono() {
    this.counterId++;
    this.form.addControl('telefono' + String(this.counterId), new FormControl(null, Validators.required));
    this.form.addControl('horaDesde' + String(this.counterId), new FormControl(null, Validators.required));
    this.form.addControl('horaHasta' + String(this.counterId), new FormControl(null, Validators.required));

    this.listaContactos.push({
      telefono: null,
      desde: null,
      hasta: null,
      id: this.counterId
    });
    console.log(this.listaContactos)
  }

  borrarTelefono(id) {
    this.listaContactos.splice(this.listaContactos.findIndex((value) => {
      return value.id == id;
    }), 1);
    this.form.removeControl('horaHasta' + String(id));
    this.form.removeControl('horaDesde' + String(id));
    this.form.removeControl('telefono' + String(id));
  }

}
