import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { BaseModalComponent } from './../../base-modal/base-modal.component';

@Component({
  selector: 'crm-modal-a-llamar',
  templateUrl: './modal-a-llamar.component.html',
  styleUrls: ['./modal-a-llamar.component.scss', '../../../../../styles/modal.scss']
})
export class ModalALlamarComponent extends BaseModalComponent {

  constructor(public dialogRef: MatDialogRef<ModalALlamarComponent>) {
    super();
  }

}
