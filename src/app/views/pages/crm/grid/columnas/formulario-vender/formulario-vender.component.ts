import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Persona } from '@modelos/persona';
import { LocalidadesService } from '@servicios/localidades.service';
import { ObrasSocialesService } from '@servicios/obras-sociales.service';

import { ObraSocial } from './../../../../../models/obraSocial';
import {
    FormularioAbmTelefonosComponent,
} from './../../../../cargar-datos/formulario-abm-telefonos/formulario-abm-telefonos.component';
import { FormularioComponent } from './../../../../cargar-datos/formulario/formulario.component';

@Component({
	selector: 'crm-formulario-vender',
	templateUrl: './formulario-vender.component.html',
	styleUrls: ['./formulario-vender.component.scss']
})
export class FormularioVenderComponent implements OnInit, AfterViewInit {

	@Output() guardar = new EventEmitter();
	@Input() persona: Persona;
	@ViewChild(FormularioComponent, { static: true }) formPersonaComponent: FormularioComponent;
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
