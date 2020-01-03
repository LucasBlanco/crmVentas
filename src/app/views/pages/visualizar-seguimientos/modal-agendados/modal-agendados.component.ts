import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Seguimiento} from "@modelos/seguimiento";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Agendado} from "@modelos/agendado";
import * as moment from 'moment'

@Component({
  selector: 'crm-modal-agendados',
  templateUrl: './modal-agendados.component.html',
  styleUrls: ['./modal-agendados.component.scss']
})
export class ModalAgendadosComponent implements OnInit {
	dataSource: MatTableDataSource<Agendado>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(public dialogRef: MatDialogRef<ModalAgendadosComponent>,
			  @Inject(MAT_DIALOG_DATA) public data: Seguimiento) { }

  ngOnInit() {
  		let agendados = this.data.agendados.map(agendado => ({ ...agendado, fecha: moment().format("DD/MM/YYYY hh:mm")}))
	  this.dataSource = new MatTableDataSource(agendados)
	  this.dataSource.paginator = this.paginator;
  }

}
