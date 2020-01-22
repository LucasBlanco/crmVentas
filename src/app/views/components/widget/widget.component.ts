import { Component, Input, OnInit } from '@angular/core';

import { DashboardChartService } from '../../services/dashboard-chart.service';

@Component({
  selector: 'crm-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() titulo = '';
  @Input() cantidad = 0;
  @Input() icon = '';
  private ventasWidget = {
    type: 'line',
    data: {
      labels: [3, 8, 5, 3, 2, 7, 9],
      datasets: [
        {
          label: 'Ventas',
          data: [3, 8, 5, 3, 2, 7, 9],
          fill: 'false',
          borderColor: '#00ff44',
          clip: 0
        }
      ]
    },

    options: {

      scaleShowLabels: false,
      bezierCurve: false,
      spanGaps: false,
      maintainAspectRatio: false,

      legend: {
        display: false
      },
      layout: {
        padding: 10
      },
      elements: {
        line: {
          tension: 0.000001
        }
      },

      scales: {
        xAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }],
      }
    }

  };

  private rellamadosWidget = {
    type: 'line',
    data: {
      labels: [4, 22, 45, 4, 9, 1, 3],
      datasets: [
        {
          label: 'Rellamados',
          data: [4, 22, 45, 4, 9, 1, 3],
          fill: 'false',
          borderColor: '#00ff44',
          clip: 0
        }
      ]
    },

    options: {

      scaleShowLabels: false,
      bezierCurve: false,
      spanGaps: false,
      maintainAspectRatio: false,

      legend: {
        display: false
      },
      layout: {
        padding: 10
      },
      elements: {
        line: {
          tension: 0.000001
        }
      },

      scales: {
        xAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }],
      }
    }

  };

  private agendadosWidget = {
    type: 'line',
    data: {
      labels: [8, 29, 3, 45, 19, 14, 38],
      datasets: [
        {
          label: 'Agendados',
          data: [8, 29, 3, 45, 19, 14, 38],
          fill: 'false',
          borderColor: '#00ff44',
          clip: 0
        }
      ]
    },

    options: {

      scaleShowLabels: false,
      bezierCurve: false,
      spanGaps: false,
      maintainAspectRatio: false,

      legend: {
        display: false
      },
      layout: {
        padding: 10
      },
      elements: {
        line: {
          tension: 0.000001
        }
      },

      scales: {
        xAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }],
      }
    }

  };



  private rechazosWidget = {
    type: 'doughnut',
    data: {
      labels: ['feo', 'enfermo', 'viejo', 'datos', 'test'],
      datasets: [
        {
          backgroundColor: ['rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
          data: [3, 8, 5, 3, 2]
        }
      ]
    },

    options: {
      maintainAspectRatio: false,

      legend: {
        display: true,
        position: 'left',
        labels: {
          boxWidth: 10,
          fontSize: 12,
        }

      },

      layout: {
        padding: 10
      },
    }
  };

  rechazosHoy = {
    labels: ['feo', 'enfermo', 'viejo', 'datos', 'test'],
    datasets: [
      {
        backgroundColor: ['rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
        data: [3, 8, 5, 3, 2]
      }
    ]
  };

  rechazos7Dias = {
    labels: ['feo', 'enfermo', 'viejo', 'datos', 'test'],
    datasets: [
      {
        backgroundColor: ['rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
        data: [42, 64, 25, 9, 4]
      }
    ]
  };

  rechazos30Dias = {
    labels: ['feo', 'enfermo', 'viejo', 'datos', 'test'],
    datasets: [
      {
        backgroundColor: ['rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
        data: [80, 180, 93, 45, 8]
      }
    ]
  };

  rechazos3Meses = {
    labels: ['feo', 'enfermo', 'viejo', 'datos', 'test'],
    datasets: [
      {
        backgroundColor: ['rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
        data: [240, 540, 279, 135, 24]
      }
    ]
  };

  rechazos6Meses = {
    labels: ['feo', 'enfermo', 'viejo', 'datos', 'test'],
    datasets: [
      {
        backgroundColor: ['rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
        data: [480, 1020, 558, 270, 48]
      }
    ]
  };

  cambiarRechazos(value) {
    if (value == 'hoy') {
      this.chartSrv.charts[3].config.data = this.rechazosHoy;
    } else if (value == '7dias') {
      this.chartSrv.charts[3].config.data = this.rechazos7Dias;
    } else if (value == '30dias') {
      this.chartSrv.charts[3].config.data = this.rechazos30Dias;
    } else if (value == '3meses') {
      this.chartSrv.charts[3].config.data = this.rechazos3Meses;
    } else if (value == '6meses') {
      this.chartSrv.charts[3].config.data = this.rechazos6Meses;
    }
    this.chartSrv.charts[3].update();
  }

  constructor(public chartSrv: DashboardChartService) {
  }

  ngOnInit() {
  }

}
