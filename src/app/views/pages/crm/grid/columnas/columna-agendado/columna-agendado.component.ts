import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactoConHorario } from '@modelos/contacto';
import { Columnas, CrmService } from '@servicios/crm.service';
import { Observable } from 'rxjs';

import { ModalAgendadoComponent } from './modal-agendado/modal-agendado.component';

@Component({
  selector: 'crm-columna-agendado',
  templateUrl: './columna-agendado.component.html',
  styleUrls: ['./columna-agendado.component.scss', '../columnas.scss']
})
export class ColumnaAgendadoComponent implements OnInit {

  contactos$: Observable<ContactoConHorario[]>;
  contactoSeleccionado: ContactoConHorario;
  @ViewChild(ModalAgendadoComponent, { static: false }) modal;

  constructor(private crmService: CrmService) { }

  ngOnInit() {
    this.contactos$ = this.crmService.getContactosAgendados();
  }

  handleLlamar(contacto: ContactoConHorario) {
    this.contactoSeleccionado = contacto;
    this.modal.open();
  }

  moverA(to) {
    this.crmService.moverContacto(Columnas.AGENDADO, to, this.contactoSeleccionado);
    this.modal.close();
  }
}
