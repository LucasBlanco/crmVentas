import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Operador } from '@modelos/operador';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardChartService } from '../../dashboard-chart.service';

@Component({
  selector: 'crm-vendedora',
  templateUrl: './vendedora.component.html',
  styleUrls: ['./vendedora.component.scss']
})
export class VendedoraComponent implements OnInit {

  private showBackButton = false;
  opcionesPosibles = [
    { value: 'hoy', nombre: 'Hoy' },
    { value: 'ultimaSemana', nombre: 'Ultima semana' },
    { value: 'ultimoMes', nombre: 'Ultimos 30 dias' },
    { value: 'ultimos3Meses', nombre: 'Ultimos 3 meses' },
    { value: 'ultimos6Meses', nombre: 'Ultimos 6 meses' },
  ];
  vendedoraCtrl = new FormControl('', Validators.required);
  vendedoras: Operador[] = [];
  vendedorasFiltradas: Observable<Operador[]>;
  rechazos = new BehaviorSubject<any>(null);
  ventas = new BehaviorSubject<any>(null);
  rellamados = new BehaviorSubject<any>(null);
  agendados = new BehaviorSubject<any>(null);
  dashboardData = new BehaviorSubject<any>(null);
  supervisorChart = new BehaviorSubject<any>({
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  vendedorasChart = new BehaviorSubject({
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true,
            scaleLabel: 1,
            fontSize: 10
          }
        }],
        xAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true,
            scaleLabel: 1,
            fontSize: 10
          }
        }]
      }
    }
  });

  constructor(public chartSrv: DashboardChartService, private route: ActivatedRoute) {
    chartSrv.dashboard = 'vendedora';
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.chartSrv.usuario = params['id'];
      this.chartSrv.traerVentasUltimaSemana().subscribe(ventas => this.ventas.next(ventas));
      this.chartSrv.traerAgendadosUltimaSemana().subscribe(ventas => this.agendados.next(ventas));
      this.chartSrv.traerRellamadosUltimaSemana().subscribe(ventas => this.rellamados.next(ventas));
      this.chartSrv.traerVentasPorEstadoUltimaSemana().subscribe(ventas => this.cargarChart(this.supervisorChart, ventas));
      this.chartSrv.traerRechazosHoy().subscribe(ventas => this.rechazos.next(ventas));
      this.chartSrv.traerVentasPorEstadoPorVendedoraHoy().subscribe(ventas => this.cargarChart(this.vendedorasChart, ventas));
    });

  }

  cargarChart = (observable, data) => observable.next({ ...observable.value, data });

  cambiarGeneral(value) {
    if (value == 'dia') {
      this.chartSrv.traerVentasPorEstadoUltimaSemana().subscribe(ventas => {
        const chart = this.supervisorChart.value;
        chart.data = ventas;
        this.supervisorChart.next(chart);
      });
    } else {
      this.chartSrv.traerVentasPorEstadoUltimoAño().subscribe(ventas => {
        const chart = this.supervisorChart.value;
        chart.data = ventas;
        this.supervisorChart.next(chart);
      });
    }
  }

  cambiarPeriodoRechazo(periodo) {
    let rechazos$;
    switch (periodo) {
      case 'hoy':
        rechazos$ = this.chartSrv.traerRechazosHoy();
        break;
      case 'ultimaSemana':
        rechazos$ = this.chartSrv.traerRechazosUltimaSemana();
        break;
      case 'ultimoMes':
        rechazos$ = this.chartSrv.traerRechazosUltimoMes();
        break;
      case 'ultimos3Meses':
        rechazos$ = this.chartSrv.traerRechazosUltimos3Meses();
        break;
      case 'ultimos6Meses':
        rechazos$ = this.chartSrv.traerRechazosUltimos6Meses();
        break;
    }
    rechazos$.subscribe(rechazos => this.rechazos.next(rechazos));
  }

  cambiarPeriodoVendedoras(periodo) {
    let ventas$;
    switch (periodo) {
      case 'hoy':
        ventas$ = this.chartSrv.traerVentasPorEstadoPorVendedoraHoy();
        break;
      case 'ultimaSemana':
        ventas$ = this.chartSrv.traerVentasPorEstadoPorVendedoraUltimaSemana();
        break;
      case 'ultimoMes':
        ventas$ = this.chartSrv.traerVentasPorEstadoPorVendedoraUltimoMes();
        break;
      case 'ultimos3Meses':
        ventas$ = this.chartSrv.traerVentasPorEstadoPorVendedoraUltimos3Meses();
        break;
      case 'ultimos6Meses':
        ventas$ = this.chartSrv.traerVentasPorEstadoPorVendedoraUltimos6Meses();
        break;
    }
    ventas$.subscribe(ventas => this.cargarChart(this.vendedorasChart, ventas));
  }
}
