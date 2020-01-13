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
  selector: 'crm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  Math = Math;
  public total = 0;
  public change = false;
  public newPercentages = [];
  formatLabel(value: number) {
    return value + '%';
  }

  changePercentage(value, index) {
    this.newPercentages[index] = value;
    this.total = this.newPercentages.reduce((accumulator: number, currentValue: number) => Number(accumulator) + Number(currentValue));
    this.change = true;
  }

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Config,
    public adminSrv: AdministracionService) { }

  ngOnInit() {
    this.newPercentages = this.adminSrv.listaConfigs[this.data.id_front].values.slice(0);
    this.total = this.newPercentages.reduce((accumulator: number, currentValue: number) => Number(accumulator) + Number(currentValue));
    this.change = false;
  }

  onYesClick(config): void {
    if (this.total !== 100) {
      alert('La suma de los porcentajes es diferente de 100. Por favor corrijalos y haga click en Aplicar nuevamente.');
    } else {
      this.adminSrv.editarConfiguracion(config.id_front, (<HTMLInputElement>document.getElementById('nombre')).value, this.newPercentages);
      this.dialogRef.close();
    }
  }
}
