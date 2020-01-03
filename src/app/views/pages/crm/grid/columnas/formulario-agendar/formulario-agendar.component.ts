import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'crm-formulario-agendar',
  templateUrl: './formulario-agendar.component.html',
  styleUrls: ['./formulario-agendar.component.scss']
})
export class FormularioAgendarComponent implements OnInit {

  @Output() guardar = new EventEmitter<{ fechaYHoraDeProximoContacto: string, nota: string }>();
	@Input() notaIn
  form

  get fechaYHoraDeProximoContacto() { return this.form.get('fechaYHoraDeProximoContacto') }
  get nota() { return this.form.get('nota') }


  constructor() { }

  ngOnInit() {
  	this.form = new FormGroup({
		fechaYHoraDeProximoContacto: new FormControl(null, Validators.required),
		nota: new FormControl(this.notaIn, Validators.required)
	});
  }

  fechaHoy() {
    return moment().format("YYYY-MM-DDThh:mm");
  }
  agendar() {
    this.guardar.emit(this.form.value);
  }
}
