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
		this.formObraSocial.patchValue({
			obraSocial: 1
		});
		this.formPersona.patchValue({
			nombre: 'Lucas',
			apellido: 'Blanco',
			nacionalidad: 'ARGENTINA',
			cuil: 12345678911,
			sexo: 'M',
			estadoCivil: 'SOLTERO',
			fechaNacimiento: '1995-10-27',
			capitas: 3,
			calle: 'Dr. Luis Belaustegui',
			numero: 4043,
			piso: 3,
			departamento: 'B',
			localidad: 1,
			codigoPostal: 1407,
		});
		this.formTelefonos.patchValue({
			contactos: [{
				telefono: 45681513,
				horaDesde: '20:00',
				horaHasta: '22:00'
			}, {
				telefono: 45681514,
				horaDesde: '21:00',
				horaHasta: '23:00'
			}
			]
		});
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
