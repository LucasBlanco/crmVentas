import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Persona } from '@modelos/persona';
import { LocalidadesService } from '@servicios/localidades.service';
import { ObrasSocialesService } from '@servicios/obras-sociales.service';

import { ObraSocial } from './../../../../../models/obraSocial';
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

	@Output() guardar = new EventEmitter();
	@Input() persona: Persona;
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
		const p = this.persona;
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
			p.telefonos.map(t => ({
				telefono: t.numero,
				horaDesde: t.horarioContacto.desde,
				horaHasta: t.horarioContacto.hasta
			}))
		);
	}
	ngOnInit() {
		this.obraSocialSrv.traerTodos().subscribe(obrasSociales => this.obrasSociales = obrasSociales);
	}

	vender() {
		console.log('persona', this.formPersona.value);
		console.log('telefonos', this.formTelefonos.value);
		console.log('obraSocial', this.formObraSocial.value);
	}

}
