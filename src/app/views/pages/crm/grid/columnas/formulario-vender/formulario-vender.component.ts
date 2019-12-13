import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment"
import {LocalidadesService} from "@servicios/localidades.service";
import {ObrasSocialesService} from "@servicios/obras-sociales.service";
import {ObraSocial} from "@modelos/obraSocial";
import {Localidad} from "@modelos/localidad";

@Component({
  selector: 'crm-formulario-vender',
  templateUrl: './formulario-vender.component.html',
  styleUrls: ['./formulario-vender.component.scss']
})
export class FormularioVenderComponent implements OnInit {

	form = new FormGroup({
		nombre: new FormControl(null, Validators.required),
		apellido: new FormControl(null, Validators.required),
		nacionalidad: new FormControl(null, Validators.required),
		cuil: new FormControl(null, [Validators.required, Validators.min(111111111111), Validators.max(99999999999)]),
		sexo: new FormControl(null, Validators.required),
		estadoCivil: new FormControl(null, Validators.required),
		fechaNacimiento: new FormControl(null, Validators.required),
		horaContactoTel1: new FormControl(null, Validators.required),
		horaContactoTel2: new FormControl(null),
		telefono1: new FormControl(null, Validators.required),
		telefono2: new FormControl(null),
		capitas: new FormControl(null),
		calle: new FormControl(null, Validators.required),
		numero: new FormControl(null, Validators.required),
		piso: new FormControl(null),
		departamento: new FormControl(null),
		localidad: new FormControl(null, Validators.required),
		codigoPostal: new FormControl(null, Validators.required),
		obraSocial: new FormControl(null, Validators.required),
	});

	obrasSociales: ObraSocial[] = []
	localidades: Localidad[] = []

	get nombre(){return this.form.get('nombre')}
	get apellido(){return this.form.get('apellido')}
	get nacionalidad(){return this.form.get('nacionalidad')}
	get cuil(){return this.form.get('cuil')}
	get sexo(){return this.form.get('sexo')}
	get estadoCivil(){return this.form.get('estadoCivil')}
	get fechaNacimiento(){return this.form.get('fechaNacimiento')}
	get horaContactoTel1(){return this.form.get('horaContactoTel1')}
	get horaContactoTel2(){return this.form.get('horaContactoTel2')}
	get telefono1(){return this.form.get('telefono1')}
	get telefono2(){return this.form.get('telefono2')}
	get capitas(){return this.form.get('capitas')}
	get calle(){return this.form.get('calle')}
	get numero(){return this.form.get('numero')}
	get piso(){return this.form.get('piso')}
	get departamento(){return this.form.get('departamento')}
	get localidad(){return this.form.get('localidad')}
	get codigoPostal(){return this.form.get('codigoPostal')}
	get obraSocial(){return this.form.get('obraSocial')}

  constructor(private localidadSrv: LocalidadesService, private obraSocialSrv: ObrasSocialesService) { }

  ngOnInit() {
		this.obraSocialSrv.traerTodos().subscribe(obrasSociales => this.obrasSociales = obrasSociales)
		this.localidadSrv.traerTodos().subscribe(localidades => this.localidades = localidades)
  }

  fechaHoy(){
		return moment().format("YYYY-MM-DDThh:mm")
	}

  vender(){

  }

}
