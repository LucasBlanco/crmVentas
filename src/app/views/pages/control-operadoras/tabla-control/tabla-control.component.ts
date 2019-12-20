import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { SesionOperador, SesionOperadorService } from '@servicios/sesion-operador.service';


@Component({
	selector: 'crm-tabla-control',
	templateUrl: './tabla-control.component.html',
	styleUrls: ['./tabla-control.component.scss']
})
export class TablaControlComponent implements OnInit {
	dataSource = new MatTableDataSource<SesionOperador>([]);
	constructor(private sesionOperadorSrv: SesionOperadorService, public dialog: MatDialog) { }

	ngOnInit() {
		this.sesionOperadorSrv.traerTodos().subscribe(operadores => {
			this.dataSource = new MatTableDataSource<SesionOperador>(operadores);
		})

	}

	determinarChipEstado(estado) {
		switch (estado) {
			case "Conectado":
				return "estadoConectado"
			case "Desconectado":
				return "estadoDesconectado"
			case "Break":
				return "estadoBreak"
		}
	}

}
