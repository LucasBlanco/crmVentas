import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { BaseModalComponent } from './../../base-modal/base-modal.component';

@Component({
  selector: 'crm-modal-rellamar',
  templateUrl: './modal-rellamar.component.html',
  styleUrls: ['./modal-rellamar.component.scss']
})
export class ModalRellamarComponent extends BaseModalComponent implements OnInit {

  @ViewChild('modalRellamar', { static: false }) modalTemplateRef: ElementRef;

  moverALlamar() { }
}
