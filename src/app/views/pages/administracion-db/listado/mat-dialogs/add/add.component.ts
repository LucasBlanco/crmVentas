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
  selector: 'crm-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  Math = Math;
  public total = 0;
  public change = false;
  public newPercentages = new Array(10);
  formatLabel(value: number) {
    return value + '%';
  }

  changePercentage(value, index) {
    this.newPercentages[index] = value;
    this.total = this.newPercentages.reduce((accumulator: number, currentValue: number) => Number(accumulator) + Number(currentValue));
    this.change = true;
  }

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    public adminSrv: AdministracionService) { }

  ngOnInit() {
    this.newPercentages.fill(0);
    this.total = this.newPercentages.reduce((accumulator: number, currentValue: number) => Number(accumulator) + Number(currentValue));
    this.change = false;
  }

  onYesClick(config): void {
    if (this.total !== 100) {
      alert('La suma de los porcentajes es diferente de 100. Por favor corrijalos y haga click en Aplicar nuevamente.');
    } else if (!(<HTMLInputElement>document.getElementById('nombre')).value) {
      alert('Debes ponerle un nombre la configuración');
    }
    else {
      let newId = this.adminSrv.listaConfigs.length;
      this.adminSrv.crearConfiguracion(newId, (<HTMLInputElement>document.getElementById('nombre')).value, this.newPercentages);
      this.dialogRef.close();
    }
  }

}
