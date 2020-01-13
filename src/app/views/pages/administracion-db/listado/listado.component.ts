import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteComponent } from './mat-dialogs/delete/delete.component';
import { InfoComponent } from './mat-dialogs/info/info.component';
import { EditComponent } from './mat-dialogs/edit/edit.component';
import { ChangeComponent } from './mat-dialogs/change/change.component';
import { AddComponent } from './mat-dialogs/add/add.component';
import { AdministracionService } from '../../../services/administracion.service';


@Component({
  selector: 'crm-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public adminSrv: AdministracionService) { }
  ngOnInit() {
    this.adminSrv.traerBases();
  }

  openDelete(config): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: config
    });
  }

  openInfo(config): void {
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '70%',
      data: config
    });
  }

  openEdit(config): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '70%',
      data: config
    });
  }

  openChange(config): void {
    const dialogRef = this.dialog.open(ChangeComponent, {
      width: '500px',
      data: config
    });
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '70%'
    });
  }

  styleSelected(selected): Object {
    if (selected) {
      return { 'background-color': 'lightblue', 'border': '1px solid green' }
    }
  }


}
