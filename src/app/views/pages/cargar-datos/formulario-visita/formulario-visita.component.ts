import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Localidad } from '@modelos/localidad';
import { LocalidadesService } from '@servicios/localidades.service';
import moment from 'moment';
import { Observable } from 'rxjs';

import { DomicilioVisita, Visita } from './../../../models/visita';

@Component({
  selector: 'crm-formulario-visita',
  templateUrl: './formulario-visita.component.html',
  styleUrls: ['./formulario-visita.component.css']
})
export class FormularioVisitaComponent implements OnInit {

  @Output() guardar = new EventEmitter();
  localidades$: Observable<Localidad[]>;
  groupErrorMatcher = {
    isErrorState(control: FormControl): boolean {
      const controlTouched = !!(control && (control.dirty || control.touched));
      const controlInvalid = !!(control && control.invalid);
      const parentInvalid = !!(
        control && control.parent
        && (control.parent.hasError('horaDesdeMayorAHoraHasta'))
        && (control.parent.dirty || control.parent.touched)
      );
      return controlTouched && (controlInvalid || parentInvalid);
    }
  };
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
  minDate = (date: string) => (control: AbstractControl): ValidationErrors | null => {
    if (moment(date, 'YYYY-MM-DD').isAfter(moment(control.value, 'YYYY-MM-DD'))) {
      return { minDate: true };
    }
    return null;
  };

  // tslint:disable-next-line: member-ordering
  form = new FormGroup({
    lugar: new FormControl(null, Validators.required),
    entreCalles: new FormControl(null, Validators.required),
    calle: new FormControl(null, Validators.required),
    numero: new FormControl(null, Validators.required),
    localidad: new FormControl(null, Validators.required),
    observacion: new FormControl(null),
    fecha: new FormControl(null, [Validators.required, this.minDate(moment().format('YYYY-MM-DD'))]),
    horaDesde: new FormControl(null, Validators.required),
    horaHasta: new FormControl(null, Validators.required),
    departamento: new FormControl(null),
    piso: new FormControl(null),
  }, { validators: [this.horaDesdePrevioAHoraHasta] });

  get lugar() { return this.form.get('lugar'); }
  get entreCalles() { return this.form.get('entreCalles'); }
  get calle() { return this.form.get('calle'); }
  get numero() { return this.form.get('numero'); }
  get localidad() { return this.form.get('localidad'); }
  get fecha() { return this.form.get('fecha'); }
  get horaDesde() { return this.form.get('horaDesde'); }
  get horaHasta() { return this.form.get('horaHasta'); }
  get observacion() { return this.form.get('observacion'); }
  get departamento() { return this.form.get('departamento'); }
  get piso() { return this.form.get('piso'); }



  constructor(localidadSrv: LocalidadesService) {
    this.localidades$ = localidadSrv.traerTodos();
  }

  ngOnInit() {
  }

  formToVisita(): Visita {
    return new Visita({
      observacion: this.observacion.value,
      fecha: this.fecha.value,
      horaDesde: this.horaDesde.value,
      horaHasta: this.horaHasta.value,
      domicilio: new DomicilioVisita({
        calle: this.calle.value,
        numero: this.numero.value,
        piso: this.piso.value,
        idLocalidad: this.localidad.value,
        lugar: this.lugar.value,
        departamento: this.departamento.value,
        entreCalles: this.entreCalles.value
      })
    });
  }

}
