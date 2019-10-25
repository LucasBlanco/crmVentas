import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(ModalALlamarComponent, { static: false }) modal;

  constructor(private crmService: CrmService) { }

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
    this.modal.open();
  }

  moverA(to) {
    this.crmService.moverContacto(Columnas.ALLAMAR, to, this.contactoSeleccionado);
    this.modal.close();
  }
}
