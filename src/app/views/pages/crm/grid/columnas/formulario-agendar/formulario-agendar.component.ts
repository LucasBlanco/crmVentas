import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment"

@Component({
  selector: 'crm-formulario-agendar',
  templateUrl: './formulario-agendar.component.html',
  styleUrls: ['./formulario-agendar.component.scss']
})
export class FormularioAgendarComponent implements OnInit {

	form = new FormGroup({
		fechaYHoraDeProximoContacto: new FormControl(null, Validators.required),
		nota: new FormControl(null, Validators.required)
	});
	get fechaYHoraDeProximoContacto(){return this.form.get('fechaYHoraDeProximoContacto')}
	get nota(){return this.form.get('nota')}


	constructor() { }

  ngOnInit() {
  }

  fechaHoy(){
		return moment().format("YYYY-MM-DDThh:mm")
  }
  agendar(){

  }
}
