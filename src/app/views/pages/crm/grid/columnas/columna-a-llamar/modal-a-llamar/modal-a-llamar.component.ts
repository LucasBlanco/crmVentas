import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { BaseModalComponent } from './../../base-modal/base-modal.component';

@Component({
  selector: 'crm-modal-a-llamar',
  templateUrl: './modal-a-llamar.component.html',
  styleUrls: ['./modal-a-llamar.component.scss']
})
export class ModalALlamarComponent extends BaseModalComponent implements OnInit {


  @ViewChild('modalALlamar', { static: false }) modalTemplateRef: ElementRef;


}
