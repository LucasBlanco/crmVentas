import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SesionOperador, SesionOperadorService } from '@servicios/sesion-operador.service';
import * as moment from 'moment';



@Component({
	selector: 'crm-tabla-control',
	templateUrl: './tabla-control.component.html',
	styleUrls: ['./tabla-control.component.scss']
})
export class TablaControlComponent implements OnInit {

	@ViewChild(MatSort, { static: true }) sort: MatSort;
	dataSource = new MatTableDataSource<SesionOperador>([]);
	constructor(private sesionOperadorSrv: SesionOperadorService, public dialog: MatDialog) { }

	ngOnInit() {
		this.sesionOperadorSrv.traerTodos().subscribe(operadores => {
			this.dataSource = new MatTableDataSource<SesionOperador>(operadores);
			this.dataSource.sort = this.sort;
		});
	}



	formatHoraActividad(fecha) {
		if (fecha) {
			const minutos = Math.abs(moment(fecha, 'YYYY-MM-DD HH:mm:ss').diff(moment(), 'minutes'));
			if (minutos < 60) {
				return 'Hace ' + minutos + ' minutos';
			} else {
				if (minutos % 60 > 0) {
					return 'Hace ' + Math.trunc(minutos / 60) + 'hora/s y ' + minutos % 60 + 'minutos';
				} else {
					return 'Hace ' + Math.trunc(minutos / 60) + 'hora/s';
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
