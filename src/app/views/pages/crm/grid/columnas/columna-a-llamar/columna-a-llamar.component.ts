import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contacto } from '@modelos/contacto';
import { CrmService } from '@servicios/crm.service';
import { Observable } from 'rxjs';

import { Columnas } from './../../../../../services/crm.service';
import { ModalALlamarComponent } from './modal-a-llamar/modal-a-llamar.component';

@Component({
  selector: 'crm-columna-a-llamar',
  templateUrl: './columna-a-llamar.component.html',
  styleUrls: ['./columna-a-llamar.component.scss', '../columnas.scss']
})
export class ColumnaALlamarComponent implements OnInit {

  contactos$: Observable<Contacto[]>;
  contactos: Contacto[];
  contactoSeleccionado: Contacto;

  constructor(private crmService: CrmService, public dialog: MatDialog) { }

  ngOnInit() {
    this.contactos$ = this.crmService.getContactosALlamar();
    this.crmService.getContactosALlamar().subscribe(
      contactos => this.contactos = contactos
    );
  }

  esElPrimerContactoDeLaCola(contacto: Contacto) {
    const indice = this.contactos.findIndex(c => c.id === contacto.id);
    return (indice === 0);
  }

  handleLlamar(contacto: Contacto) {
    this.contactoSeleccionado = contacto;
    const dialogRef = this.dialog.open(ModalALlamarComponent, {
      width: '60%',
      panelClass: 'custom'
    });
  }

  moverA(to) {
    this.crmService.moverContacto(Columnas.ALLAMAR, to, this.contactoSeleccionado);
  }
}
