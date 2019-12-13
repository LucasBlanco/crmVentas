import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Localidad } from '@modelos/localidad';
import { ObraSocial } from '@modelos/obraSocial';
import { Persona } from '@modelos/persona';
import { LocalidadesService } from '@servicios/localidades.service';
import { ObrasSocialesService } from '@servicios/obras-sociales.service';
import * as moment from 'moment';

@Component({
	selector: 'crm-formulario-vender',
	templateUrl: './formulario-vender.component.html',
	styleUrls: ['./formulario-vender.component.scss']
})
export class FormularioVenderComponent implements OnInit {

	@Output() guardar = new EventEmitter();
	@Input() persona: Persona;

	form = new FormGroup({
		nombre: new FormControl(null, Validators.required),
		apellido: new FormControl(null, Validators.required),
		nacionalidad: new FormControl(null, Validators.required),
		cuil: new FormControl(null, [Validators.required, Validators.min(11111111111), Validators.max(99999999999)]),
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

	get nombre() { return this.form.get('nombre') }
	get apellido() { return this.form.get('apellido') }
	get nacionalidad() { return this.form.get('nacionalidad') }
	get cuil() { return this.form.get('cuil') }
	get sexo() { return this.form.get('sexo') }
	get estadoCivil() { return this.form.get('estadoCivil') }
	get fechaNacimiento() { return this.form.get('fechaNacimiento') }
	get horaContactoTel1() { return this.form.get('horaContactoTel1') }
	get horaContactoTel2() { return this.form.get('horaContactoTel2') }
	get telefono1() { return this.form.get('telefono1') }
	get telefono2() { return this.form.get('telefono2') }
	get capitas() { return this.form.get('capitas') }
	get calle() { return this.form.get('calle') }
	get numero() { return this.form.get('numero') }
	get piso() { return this.form.get('piso') }
	get departamento() { return this.form.get('departamento') }
	get localidad() { return this.form.get('localidad') }
	get codigoPostal() { return this.form.get('codigoPostal') }
	get obraSocial() { return this.form.get('obraSocial') }

	constructor(private localidadSrv: LocalidadesService, private obraSocialSrv: ObrasSocialesService) { }

	ngOnInit() {
		this.obraSocialSrv.traerTodos().subscribe(obrasSociales => this.obrasSociales = obrasSociales)
		this.localidadSrv.traerTodos().subscribe(localidades => this.localidades = localidades)
		const domicilio = this.persona.domicilio;
		this.form.patchValue({
			...this.persona,
			fechaNacimiento: moment(this.persona.fechaNacimiento, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD'),
			telefono1: this.persona.telefono,
			telefono2: this.persona.celular,
			horaContactoTel1: this.persona.horaContactoTelefono,
			horaContactoTel2: this.persona.horaContactoCelular,
			calle: domicilio && domicilio.calle,
			numero: domicilio && domicilio.numero,
			piso: domicilio && domicilio.piso,
			departamento: domicilio && domicilio.departamento,
			localidad: domicilio && domicilio.idLocalidad,
			codigoPostal: domicilio && domicilio.codigoPostal
		})
		Object.keys(this.form.controls).forEach(field => {
			const control = this.form.get(field);
			control.markAsTouched({ onlySelf: true });
		});
	}

	fechaHoy() {
		return moment().format("YYYY-MM-DDThh:mm");
	}

	vender() {
		this.guardar.emit(this.form.value);
	}

}
