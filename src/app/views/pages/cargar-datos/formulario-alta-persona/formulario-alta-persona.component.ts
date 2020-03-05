import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Localidad } from '@modelos/localidad';
import { Persona } from '@modelos/persona';
import { LocalidadesService } from '@servicios/localidades.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'crm-formulario-alta-persona',
  templateUrl: './formulario-alta-persona.component.html',
  styleUrls: ['./formulario-alta-persona.component.scss']
})
export class FormularioAltaPersonaComponent implements OnInit {


  @Input() persona: Persona;



  // tslint:disable-next-line: member-ordering
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

  localidades$: Observable<Localidad[]>;
  constructor(private localidadSrv: LocalidadesService) { }

  ngOnInit() {
    this.localidades$ = this.localidadSrv.traerTodos();
  }

  fechaHoy = () => moment().format('YYYY-MM-DDThh:mm');

  mapFormToPersona(): Persona {
    return new Persona({
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      cuil: this.cuil.value,
      nacionalidad: this.nacionalidad.value,
      domicilio: {
        calle: this.calle.value,
        codigoPostal: this.codigoPostal.value,
        departamento: this.departamento.value,
        numero: this.numero.value,
        piso: this.piso.value,
        idLocalidad: this.localidad.value
      },
      estadoCivil: this.estadoCivil.value,
      fechaNacimiento: this.fechaNacimiento.value,
      sexo: this.sexo.value,
      capitas: this.capitas.value,
      telefonos: []
    });
  }

}
