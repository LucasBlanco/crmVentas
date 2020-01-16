import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Operador } from '@modelos/operador';
import { DashboardChartService } from '@servicios/dashboard-chart.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      /*this.chartSrv.traerDatosDashboardVendedora(params['id']).subscribe(dashboard => {
        this.rechazos.next(dashboard.rechazos);
        this.ventas.next(dashboard.indicadores.ventas);
        this.agendados.next(dashboard.indicadores.agendados);
        this.rellamados.next(dashboard.indicadores.rellamados);
        this.dashboardData.next(dashboard);
        this.llenarChart(dashboard.porDia.labels, dashboard.porDia.datasets, this.supervisorChart);
        this.llenarChart(dashboard.vendedoras.hoy.labels, dashboard.vendedoras.hoy.datasets, this.vendedorasChart);
      });*/
    });

  }

  cambiarGeneral(value) {
    if (value == 'dia') {
      this.llenarChart(this.dashboardData.value.porDia.labels, this.dashboardData.value.porDia.datasets, this.supervisorChart);
    } else {
      this.llenarChart(this.dashboardData.value.porMes.labels, this.dashboardData.value.porMes.datasets, this.supervisorChart);
    }
  }

  cambiarVendedoras(value) {
    if (this.showBackButton == false) {
      this.llenarChart(
        this.dashboardData.value.vendedoras[value].labels,
        this.dashboardData.value.vendedoras[value].datasets,
        this.vendedorasChart
      );
    } else {
      if (value == 'dia') {
        // this.chartSrv.charts.find(v => v.id === 'vendedoras').config.data = this.carlitaDia;
      } else {
        // this.chartSrv.charts.find(v => v.id === 'vendedoras').config.data = this.carlitaMes;
      }
    }
    // this.chartSrv.charts.find(v => v.id === 'vendedoras').update();
  }



  cambiarAVendedora(clickedElementindex, label) {
    this.showBackButton = true;
    document.getElementById('titulo').innerHTML = label;
    document.getElementById('subtitulo').innerHTML = 'Gráfico de vendedora';
  }

  backButton() {
    this.showBackButton = false;
    this.cambiarVendedoras('hoy');
    document.getElementById('titulo').innerHTML = 'Vendedoras';
    document.getElementById('subtitulo').innerHTML = 'Estadísticas por vendedora';
  }


  llenarChart(labels, dataset, observable) {
    const chart = observable.value;
    chart.data.labels = labels;
    chart.data.datasets = dataset;
    observable.next(chart);
  }

  redireccionarAVendedora() {
    const id = this.vendedoras.find(v => v.nombre === this.vendedoraCtrl.value).id;
    console.log(id);
  }
}
