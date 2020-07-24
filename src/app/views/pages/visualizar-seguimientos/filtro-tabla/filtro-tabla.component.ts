import { Estados } from './../../../enums/estados';
import { LaravelPaginatorAdapter } from './../../../helpers/laravel-paginator';
import { EstadoService } from '@servicios/estado.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Operador } from '@modelos/operador';
import { ObraSocial } from '@modelos/obraSocial';
import { OperadoresService } from '@servicios/operadores.service';
import { SeguimientosService } from '@servicios/seguimientos.service';
import { ObrasSocialesService } from '@servicios/obras-sociales.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Seguimiento } from '@modelos/seguimiento';
import { ModalBreakComponent } from '../../modal-break/modal-break.component';
import { ModalAgendadosComponent } from '../modal-agendados/modal-agendados.component';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import * as moment from 'moment';
@Component({
	selector: 'crm-filtro-tabla',
	templateUrl: './filtro-tabla.component.html',
	styleUrls: ['./filtro-tabla.component.scss'],
})
export class FiltroTablaComponent implements OnInit {

	dataSource = new MatTableDataSource<Seguimiento>();
	paginator: LaravelPaginatorAdapter<Seguimiento>;
	obrasSociales: ObraSocial[] = [];
	operadores: Operador[] = [];
	estados = [];

	form = new FormGroup({
		operador: new FormControl(null, null),
		obraSocial: new FormControl(null, null),
		desde: new FormControl(null, [
			RxwebValidators.required({ conditionalExpression: x => x.hasta !== null && x.hasta !== '' }),
			RxwebValidators.date(),
			RxwebValidators.maxDate({ fieldName: 'hasta' })
		]),
		hasta: new FormControl(null, [
			RxwebValidators.required({ conditionalExpression: x => x.desde !== null && x.desde !== '' }),
			RxwebValidators.date(),
			RxwebValidators.minDate({ fieldName: 'desde' })
		]),
		cuil: new FormControl(null, [Validators.minLength(11), Validators.maxLength(11)]),
		estado: new FormControl(null)
	});
	constructor(
		private operadorSrv: OperadoresService,
		private obraSocialSrv: ObrasSocialesService,
		private seguimientoSrv: SeguimientosService,
		private estadoSrv: EstadoService,
		public dialog: MatDialog,
	) { }

	ngOnInit() {
		this.operadorSrv.traerTodos().subscribe(operadores => this.operadores = operadores);
		this.obraSocialSrv.traerTodos().subscribe(obrasSociales => this.obrasSociales = obrasSociales);
		this.estadoSrv.getAll().subscribe(estados => this.estados = estados);
	}

	buscar() {
		const operador = this.form.get('operador').value;
		const obraSocial = this.form.get('obraSocial').value;
		const cuil = this.form.get('cuil').value;
		const desde = this.form.get('desde').value && moment(this.form.get('desde').value);
		const hasta = this.form.get('hasta').value && moment(this.form.get('hasta').value);
		const estado = this.form.get('estado').value;

		const parametros = { operador, obraSocial, cuil, desde, hasta, estado };
		this.paginator = this.seguimientoSrv.traerTodos(parametros);
		this.paginator.data.subscribe(seguimientos => this.dataSource.data = seguimientos);
		this.paginator.loadFirstPage();
	}

	limpiarFiltros() {
		this.form.reset();
	}

	mostrarAgendados(seguimiento) {
		const dialogRef = this.dialog.open(ModalAgendadosComponent, {
			width: '60%',
			panelClass: 'custom',
			data: seguimiento
		});
	}

	selectPage(page: { pageIndex: number; }) {
		this.paginator.loadPage(page.pageIndex + 1);
	}

	getVendedora(seguimiento: Seguimiento) {
		return seguimiento.estados.find(e => e.estado === Estados.ASIGNADO).usuario.nombre;
	}

}
