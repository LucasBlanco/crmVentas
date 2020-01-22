import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { BaseModalComponent } from './../../base-modal/base-modal.component';

@Component({
  selector: 'crm-modal-rellamar',
  templateUrl: './modal-rellamar.component.html',
  styleUrls: ['./modal-rellamar.component.scss']
})
export class ModalRellamarComponent extends BaseModalComponent {

  constructor(public dialogRef: MatDialogRef<ModalRellamarComponent>,
			  @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }
}
