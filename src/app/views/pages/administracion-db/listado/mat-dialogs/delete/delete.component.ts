import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdministracionService } from '../../../../../services/administracion.service';

@Component({
  selector: 'crm-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string },
    public adminSrv: AdministracionService) { }

  ngOnInit() {
  }

  onYesClick(config): void {
    let index = this.adminSrv.listaConfigs.indexOf(config);
    if (index !== -1) {
      this.adminSrv.borrarConfiguracion(config.id_front, index);
      this.dialogRef.close();
    }
  }

}
