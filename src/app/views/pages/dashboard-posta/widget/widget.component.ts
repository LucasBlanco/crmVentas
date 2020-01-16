import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardChartService } from '@servicios/dashboard-chart.service';
import { BehaviorSubject } from 'rxjs';



@Component({
	selector: 'crm-widget',
	templateUrl: './widget.component.html',
	styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, AfterViewInit {
	@Input() titulo = '';
	@Input() icon = '';
	@Input() data = new BehaviorSubject(null);
	@Input() id = '';
	@Input() tieneOpciones = false;
	@Input() tipo: 'bar' | 'doughnut' = 'bar';
	@Input() opciones = [];
	@Output() opcionSeleccionada = new EventEmitter();
	cantidad = 0;
	trend = { color: '', icon: '', number: '' };
	showTrend = false;

	constructor(public chartSrv: DashboardChartService) {
	}

	chartWidget = new BehaviorSubject<any>({
		type: 'bar',
		data: {
			labels: [],
			datasets: []
		},
		options: {}

	});

	optionsDona = {
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
	};

	optionsChart = {
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
					display: false,
				}
			}],
		}
	};

	cambiarDeOpcion(value) {
		/*const chartWidget = this.chartWidget.value;
		chartWidget.data.labels = this.data[value].historico.data.labels;
		chartWidget.data.datasets = this.data[value].historico.data.datasets;
		this.cantidad = this.data[value].actual;
		this.chartWidget.next(chartWidget);*/
		this.opcionSeleccionada.emit(value);
	}


	ngOnInit() {
		this.data.subscribe(this.cargarChart.bind(this));
	}

	cargarChart(data) {
		if (!data) { return; }
		this.cantidad = data.valorActual;
		const chart = this.chartWidget.value;
		chart.data = { labels: data.labels, datasets: data.datasets };
		chart.type = this.tipo;
		chart.options = this.tipo === 'bar' ? this.optionsChart : this.optionsDona;
		this.chartWidget.next(chart);
	}

	ngAfterViewInit() {



	}

	cantidadDiaAnterior = () => this.data.value.historico.data.datasets[0].data[this.data.value.historico.data.datasets[0].data.length - 1];
}
