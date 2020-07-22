import { AgendadosPorChica } from './../../models/agendados';
import { ResultadoBase } from './../../models/resultadoBase';
import { BehaviorSubject } from 'rxjs';
import { EstadisticasService } from './../../services/estadisticas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material';

@Component({
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
  ventasPorPersona$ = new BehaviorSubject(this.baseConfig);
  basesDataSource = new MatTableDataSource<ResultadoBase>();
  agendadosDataSource = new MatTableDataSource<{ nombre: string, cantidad: number; }>();
  totalAgendados = 0;
  @ViewChild('sortAgendados', { static: true }) sortAgendados: MatSort;
  @ViewChild('sortBases', { static: true }) sortBases: MatSort;
  constructor(private estadisticasApi: EstadisticasService) {

  }

  ngOnInit() {
    this.estadisticasApi.gestionadosPorPersona().subscribe(config => this.gestionadosPorPersona$.next(config));
    this.estadisticasApi.netasYBrutas().subscribe(config => this.brutasYNetas$.next(config as any));
    this.cambiarRangoVentasPorPersona('hoy');
    this.estadisticasApi.resultadosBase().subscribe(resultados => {
      this.basesDataSource.sort = this.sortAgendados;
      this.basesDataSource.filterPredicate = (base, filtro) => base.nombre.toUpperCase().includes(filtro.toUpperCase());
      this.basesDataSource.data = resultados;
    });
    this.estadisticasApi.agendados().subscribe(a => {
      this.agendadosDataSource.data = a.data;
      this.agendadosDataSource.sort = this.sortAgendados;
      this.agendadosDataSource.filterPredicate = (data, filtro) => data.nombre.toUpperCase().includes(filtro.toUpperCase());
      this.totalAgendados = a.total;
    });
  }

  actualizarFiltroBase(filtro) {
    this.basesDataSource.filter = filtro;
  }

  actualizarFiltroAgendados(filtro) {
    this.agendadosDataSource.filter = filtro;
  }
  cambiarRangoVentasPorPersona(rango) {
    this.estadisticasApi.ventasPorPersona(rango).subscribe(config => this.ventasPorPersona$.next(config as any));
  }

}
