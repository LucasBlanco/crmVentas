import { BehaviorSubject } from 'rxjs';
import { EstadisticasService } from './../../services/estadisticas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';

@Component({
  selector: 'crm-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  baseConfig = {
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    }
  };
  gestionadosPorPersona$ = new BehaviorSubject(this.baseConfig);
  brutasYNetas$ = new BehaviorSubject(this.baseConfig);
  basesDataSource = new MatTableDataSource<any>(BASES_DATA);
  filtroBase: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private estadisticasApi: EstadisticasService) {

  }

  ngOnInit() {
    this.basesDataSource.sort = this.sort;
    this.basesDataSource.filterPredicate = base => base.nombre === this.filtroBase;
    this.estadisticasApi.gestionadosPorPersona().subscribe(config => this.gestionadosPorPersona$.next(config));
    this.estadisticasApi.netasYBrutas().subscribe(config => this.brutasYNetas$.next(config as any));
  }


}
const BASES_DATA = [{
  nombre: 'base1',
  totales: 200,
  llamadas: 500,
  contactadas: 100,
  vendidas: 300,
  vendibles: 600,
  invendibles: 400,
  porcContactadas: 100,
  porcVendidas: 300,
  porcVendibles: 600,
  porcInvendibles: 400,
},
{
  nombre: 'ase1',
  totales: 900,
  llamadas: 900,
  contactadas: 900,
  vendidas: 900,
  vendibles: 900,
  invendibles: 900,
  porcContactadas: 900,
  porcVendidas: 900,
  porcVendibles: 900,
  porcInvendibles: 900,
}];