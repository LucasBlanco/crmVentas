import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SesionOperador, SesionOperadorService } from '@servicios/sesion-operador.service';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';



@Component({
	selector: 'crm-tabla-control',
	templateUrl: './tabla-control.component.html',
	styleUrls: ['./tabla-control.component.scss']
})
export class TablaControlComponent implements OnInit {

	@ViewChild(MatSort, { static: true }) sort: MatSort;
	dataSource = new MatTableDataSource<SesionOperador>([]);
	filtros = {
		estados: [],
		nombre: ''
	};
	sesionesOperador$ = new BehaviorSubject<SesionOperador[]>([]);

	constructor(private sesionOperadorSrv: SesionOperadorService, public dialog: MatDialog) { }

	ngOnInit() {
		this.sesionesOperador$ = this.sesionOperadorSrv.traerTodos();
		this.sesionesOperador$.subscribe(operadores => {
			this.updateTabla();
		});
	}

	updateTabla() {
		const operadores = this.sesionesOperador$.value
			.filter(this.filtroEstado.bind(this))
			.filter(this.filtroNombre.bind(this));
		this.dataSource = new MatTableDataSource<SesionOperador>(operadores);
		this.dataSource.sort = this.sort;
	}

	filtroEstado(operador) {
		if (this.filtros.estados.length === 0) { return true; }
		return this.filtros.estados.some(e => e.toLowerCase() === operador.estado.nombre.toLowerCase());
	}

	filtroNombre(operador) {
		if (!this.filtros.nombre) { return true; }
		return operador.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase());
	}

	filtrar(filtros) {
		this.dataSource.filter = `${filtros.estados.join(',')};${filtros.nombre}`;
	}


	formatHoraActividad(fecha) {
		if (fecha) {
			const minutos = Math.abs(moment(fecha, 'YYYY-MM-DD HH:mm:ss').diff(moment(), 'minutes'));
			if (minutos < 60) {
				return 'Hace ' + minutos + ' minutos';
			} else {
				if (minutos % 60 > 0) {
					return 'Hace ' + Math.trunc(minutos / 60) + ' hora/s y ' + minutos % 60 + ' minutos';
				} else {
					return 'Hace ' + Math.trunc(minutos / 60) + ' hora/s';
				}
			}
		}
	}


	determinarChipEstado(estado) {
		switch (estado) {
			case 'Conectado':
				return 'estadoConectado';
			case 'Desconectado':
				return 'estadoDesconectado';
			case 'Break':
				return 'estadoBreak';
		}
	}

}
