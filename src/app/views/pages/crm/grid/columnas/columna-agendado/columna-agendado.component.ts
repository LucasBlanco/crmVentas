import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactoConHorario } from '@modelos/contacto';
import { Columnas, CrmService } from '@servicios/crm.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalAgendadoComponent } from './modal-agendado/modal-agendado.component';

@Component({
  selector: 'crm-columna-agendado',
  templateUrl: './columna-agendado.component.html',
  styleUrls: ['./columna-agendado.component.scss', '../columnas.scss']
})
export class ColumnaAgendadoComponent implements OnInit {

  contactos$: Observable<ContactoConHorario[]>;
  contactoSeleccionado: ContactoConHorario;

  constructor(private crmService: CrmService, public dialog: MatDialog) { }

  ngOnInit() {
    this.contactos$ = this.crmService.getContactosAgendados().pipe(
      map(contactos => {
        const contactosHabilitados = contactos.filter(c => c.habilitado);
        const contactosNoHabilitados = contactos.filter(c => !c.habilitado);
        return [...contactosHabilitados, ...contactosNoHabilitados];
      })
    );
  }

  handleLlamar(contacto: ContactoConHorario) {
    this.contactoSeleccionado = contacto;
    const dialogRef = this.dialog.open(ModalAgendadoComponent, {
      width: '60%',
      panelClass: 'custom'
    });
    dialogRef.componentInstance.agendar.subscribe(form => {
      this.crmService.agendar(Columnas.AGENDADO, { ...form, id: this.contactoSeleccionado.id });
      dialogRef.close()
    })
  }


}
