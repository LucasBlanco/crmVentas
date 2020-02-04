import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LocalidadesService } from '@servicios/localidades.service';
import { ObrasSocialesService } from '@servicios/obras-sociales.service';

import { Contacto } from './../../../../../models/contacto';
import { ObraSocial } from './../../../../../models/obraSocial';
import { Venta } from './../../../../../models/venta';
import {
    FormularioAbmTelefonosComponent,
} from './../../../../cargar-datos/formulario-abm-telefonos/formulario-abm-telefonos.component';
import {
    FormularioVentaPersonaComponent,
} from './../../../../cargar-datos/formulario-venta-persona/formulario-venta-persona.component';

@Component({
	selector: 'crm-formulario-vender',
	templateUrl: './formulario-vender.component.html',
	styleUrls: ['./formulario-vender.component.scss']
})
export class FormularioVenderComponent implements OnInit, AfterViewInit {

	@Output() guardar = new EventEmitter<Venta>();
	@Input() contacto: Contacto;
	@ViewChild(FormularioVentaPersonaComponent, { static: true }) formPersonaComponent: FormularioVentaPersonaComponent;
	@ViewChild(FormularioAbmTelefonosComponent, { static: true }) formTelefonosComponent: FormularioAbmTelefonosComponent;
	formPersona: FormGroup;
	formTelefonos: FormGroup;
	obrasSociales: ObraSocial[];
	formObraSocial = new FormGroup({
		obraSocial: new FormControl(null, Validators.required)
	});

	get obraSocialCtrl() { return this.formObraSocial.get('obraSocial'); }

	constructor(private localidadSrv: LocalidadesService, private obraSocialSrv: ObrasSocialesService) { }

	ngAfterViewInit() {
		this.formPersona = this.formPersonaComponent.form;
		this.formTelefonos = this.formTelefonosComponent.form;
		const p = this.contacto.persona;
		console.log('persona', p);
		this.formPersona.patchValue({
			nombre: p.nombre,
			apellido: p.apellido,
			nacionalidad: p.nacionalidad,
			cuil: p.cuil,
			sexo: p.sexo,
			estadoCivil: p.estadoCivil,
			fechaNacimiento: p.fechaNacimiento,
			capitas: p.capitas,
			calle: p.domicilio && p.domicilio.calle,
			numero: p.domicilio && p.domicilio.numero,
			piso: p.domicilio && p.domicilio.piso,
			departamento: p.domicilio && p.domicilio.departamento,
			localidad: p.domicilio && p.domicilio.idLocalidad,
			codigoPostal: p.domicilio && p.domicilio.codigoPostal,
		});
		this.formTelefonosComponent.cargarTelefonos(
			this.contacto.telefonos
		);
	}
	ngOnInit() {
		this.obraSocialSrv.traerTodos().subscribe(obrasSociales => this.obrasSociales = obrasSociales);
	}

	vender() {
		const fp = this.formPersona.value;
		const fo = this.formObraSocial.value;
		const venta: Venta = {
			id: this.contacto.id,
			nombre: fp.nombre,
			apellido: fp.apellido,
			dni: fp.dni,
			cuil: fp.cuil,
			nacionalidad: fp.nacionalidad,
			domicilio: {
				calle: fp.calle,
				codigoPostal: fp.codigoPostal,
				departamento: fp.departamento,
				numero: fp.numero,
				piso: fp.piso,
				idLocalidad: fp.localidad
			},
			estadoCivil: fp.estadoCivil,
			fechaNacimiento: fp.fechaNacimiento,
			sexo: fp.sexo,
			capitas: fp.capitas,
			idObraSocial: fo.obraSocial
		};
		this.guardar.emit(venta);
	}

	asd() {
		Object.keys(this.formTelefonos.controls).forEach(key => {
			const controlErrors: ValidationErrors = this.formTelefonos.get(key).errors;
			if (controlErrors) {
				console.log(controlErrors);
			}
		});
	}

}
