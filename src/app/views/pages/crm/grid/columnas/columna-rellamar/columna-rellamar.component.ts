import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Columnas, CrmService } from '@servicios/crm.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  hayContactosAgendados = false;

  constructor(private crmService: CrmService, public dialog: MatDialog) { }

  ngOnInit() {
    this.contactos$ = this.crmService.getContactosARellamar().pipe(
      map(contactos => {
        const contactosHabilitados = contactos.filter(c => c.habilitado);
        const contactosNoHabilitados = contactos.filter(c => !c.habilitado);
        return [...contactosHabilitados, ...contactosNoHabilitados];
      })
    );
    this.crmService.hayContactosAgendados().subscribe(hayAgendados => {
      this.hayContactosAgendados = hayAgendados;
    });
  }

  handleLlamar(contacto: ContactoConHorario) {
    this.contactoSeleccionado = contacto;
    const dialogRef = this.dialog.open(ModalRellamarComponent, {
      width: '60%',
      panelClass: 'custom'
    });
    dialogRef.componentInstance.agendar.subscribe(form => {
      this.crmService.agendar(Columnas.RELLAMAR, { ...form, id: this.contactoSeleccionado.id });
      dialogRef.close()
    })
  }



}
