import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { BaseModalComponent } from './../../base-modal/base-modal.component';

@Component({
  selector: 'crm-modal-agendado',
  templateUrl: './modal-agendado.component.html',
  styleUrls: ['./modal-agendado.component.scss', '../../../../../styles/modal.scss']
})
export class ModalAgendadoComponent extends BaseModalComponent {

  constructor(public dialogRef: MatDialogRef<ModalAgendadoComponent>,
			  @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

}
