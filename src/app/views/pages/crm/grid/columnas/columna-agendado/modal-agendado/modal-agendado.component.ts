import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { BaseModalComponent } from './../../base-modal/base-modal.component';

@Component({
  selector: 'crm-modal-agendado',
  templateUrl: './modal-agendado.component.html',
  styleUrls: ['./modal-agendado.component.scss']
})
export class ModalAgendadoComponent extends BaseModalComponent implements OnInit {

  @ViewChild('modalAgendado', { static: false }) modalTemplateRef: ElementRef;

  moverALlamar() { }
  moverAReLlamar() { }

}
