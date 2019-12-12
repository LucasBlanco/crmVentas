import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Columnas, CrmService } from '@servicios/crm.service';
import { Observable } from 'rxjs';

import { ContactoConHorario } from './../../../../../models/contacto';
import { ModalRellamarComponent } from './modal-rellamar/modal-rellamar.component';

@Component({
  selector: 'crm-columna-rellamar',
  templateUrl: './columna-rellamar.component.html',
  styleUrls: ['./columna-rellamar.component.scss', '../columnas.scss']
})
export class ColumnaRellamarComponent implements OnInit {

  contactos$: Observable<ContactoConHorario[]>;
  contactoSeleccionado: ContactoConHorario;

  constructor(private crmService: CrmService, public dialog: MatDialog) { }

  ngOnInit() {
    this.contactos$ = this.crmService.getContactosARellamar();
  }

  handleLlamar(contacto: ContactoConHorario) {
    this.contactoSeleccionado = contacto;
    const dialogRef = this.dialog.open(ModalRellamarComponent, {
      width: '60%',
      panelClass: 'custom'
    });
  }

  moverA(to) {
    this.crmService.moverContacto(Columnas.RELLAMAR, to, this.contactoSeleccionado);
  }
}
