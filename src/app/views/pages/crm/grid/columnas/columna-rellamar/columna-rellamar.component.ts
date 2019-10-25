import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(ModalRellamarComponent, { static: false }) modal;

  constructor(private crmService: CrmService) { }

  ngOnInit() {
    this.contactos$ = this.crmService.getContactosARellamar();
  }

  handleLlamar(contacto: ContactoConHorario) {
    this.contactoSeleccionado = contacto;
    this.modal.open();
  }

  moverA(to) {
    this.crmService.moverContacto(Columnas.RELLAMAR, to, this.contactoSeleccionado);
    this.modal.close();
  }
}
