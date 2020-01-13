import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdministracionService } from '../../../../../services/administracion.service';

@Component({
  selector: 'crm-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string },
    public adminSrv: AdministracionService) { }

  ngOnInit() {
  }

  onYesClick(config): void {
    let index = this.adminSrv.listaConfigs.findIndex((element) => {
      return element.selected === true;
    });
    this.adminSrv.listaConfigs[index].selected = false;
    index = this.adminSrv.listaConfigs.findIndex((element) => {
      return element.id_front === config.id_front;
    });
    this.adminSrv.listaConfigs[index].selected = true;
    this.dialogRef.close();
  }
}
