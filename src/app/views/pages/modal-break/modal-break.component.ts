import { Component, OnInit } from '@angular/core';
import {ActividadSesionService} from "@servicios/actividad-sesion.service";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'crm-modal-break',
  templateUrl: './modal-break.component.html',
  styleUrls: ['./modal-break.component.scss']
})
export class ModalBreakComponent implements OnInit {

  constructor(private actividadSesionSrv: ActividadSesionService, private dialogRef: MatDialogRef<ModalBreakComponent>) { }

  ngOnInit() {
  }

  finalizarBreak()
  {
  	this.actividadSesionSrv.finalizarBreak()
	  this.dialogRef.close()
  }

}
