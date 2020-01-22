import {Component, OnInit, ViewChild} from '@angular/core';
import {Operador} from "@modelos/operador";
import {ObraSocial} from "@modelos/obraSocial";
import {OperadoresService} from "@servicios/operadores.service";
import {SeguimientosService} from "@servicios/seguimientos.service";
import {ObrasSocialesService} from "@servicios/obras-sociales.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS} from "@angular/material-moment-adapter";
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {Seguimiento} from "@modelos/seguimiento";
import {ModalBreakComponent} from "../../modal-break/modal-break.component";
import {ModalAgendadosComponent} from "../modal-agendados/modal-agendados.component";

@Component({
  selector: 'crm-filtro-tabla',
  templateUrl: './filtro-tabla.component.html',
  styleUrls: ['./filtro-tabla.component.scss'],
	providers: [
		{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
		},
		{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},]
})
export class FiltroTablaComponent implements OnInit {

	dataSource: MatTableDataSource<Seguimiento>;
	obrasSociales: ObraSocial[] = []
	operadores: Operador[] = []
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	form = new FormGroup({
		operador: new FormControl(null, null),
		obraSocial: new FormControl(null, null),
		desde: new FormControl(null, null),
		hasta: new FormControl(null, null),
		cuil: new FormControl(null, [Validators.minLength(11), Validators.maxLength(11)])
	})
	constructor(
		private operadorSrv: OperadoresService,
		private obraSocialSrv: ObrasSocialesService,
		private seguimientoSrv: SeguimientosService,
		public dialog: MatDialog
		) { }

  ngOnInit() {
	  this.operadorSrv.traerTodos().subscribe(operadores => this.operadores = operadores)
	  this.obraSocialSrv.traerTodos().subscribe(obrasSociales => this.obrasSociales = obrasSociales)
  }

  buscar() {
		let operador = this.form.get('operador').value
		let obraSocial = this.form.get('obraSocial').value
		let cuil = this.form.get('cuil').value
		let desde = this.form.get('desde').value
		let hasta = this.form.get('hasta').value

	  let parametros = {operador, obraSocial, cuil, desde, hasta}
	  this.seguimientoSrv.traerTodos(parametros).subscribe(x => {
	  	this.dataSource = new MatTableDataSource(x)
		  this.dataSource.paginator = this.paginator;

	  })

  }

  limpiarFiltros(){
		this.form.reset()
  }

  mostrarAgendados(seguimiento){
	  const dialogRef = this.dialog.open(ModalAgendadosComponent, {
		  width: '60%',
		  panelClass: 'custom',
			data: seguimiento
	  });
  }
}
