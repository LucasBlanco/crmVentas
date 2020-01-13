import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdministracionService } from '../../../../../services/administracion.service';

export interface Config {
  nombre: string;
  id: number;
  id_front: number;
  selected: boolean;
  values: number[];
}

@Component({
  selector: 'crm-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  Math = Math;
  public total = 0;
  public change = false;
  private newPercentages = [];
  formatLabel(value: number) {
    return value + '%';
  }

  constructor(
    public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Config,
    public adminSrv: AdministracionService) { }

  ngOnInit() {
    this.newPercentages = this.adminSrv.listaConfigs[this.data.id_front].values.slice(0);
    this.total = this.newPercentages.reduce((accumulator: number, currentValue: number) => Number(accumulator) + Number(currentValue));
    this.change = false;
  }
}
