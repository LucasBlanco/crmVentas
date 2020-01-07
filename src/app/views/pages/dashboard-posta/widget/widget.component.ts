import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
	@Input() selectOptions = [];
	cantidad = 0;
	trend = { color: '', icon: '', number: '' };
	showTrend = false;

	constructor(public chartSrv: DashboardChartService) {
	}

	chartWidget = new BehaviorSubject({
		type: 'doughnut',
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
		const chartWidget = this.chartWidget.value;
		chartWidget.data.labels = this.data[value].historico.data.labels;
		chartWidget.data.datasets = this.data[value].historico.data.datasets;
		this.cantidad = this.data[value].actual;
		this.chartWidget.next(chartWidget);
	}


	ngOnInit() {
		this.data.subscribe(this.cargarChart.bind(this));
	}

	cargarChart(data) {
		if (!data) { return; }
		const chartWidget = this.chartWidget.value;
		if (this.selectOptions.length > 0) {
			this.showTrend = false;
			this.cantidad = data[this.selectOptions[0].value].actual;
			chartWidget.options = data[this.selectOptions[0].value].historico.type === 'doughnut' ? this.optionsDona : this.optionsChart;
			chartWidget.type = data[this.selectOptions[0].value].historico.type;
			chartWidget.data.labels = data[this.selectOptions[0].value].historico.data.labels;
			chartWidget.data.datasets = data[this.selectOptions[0].value].historico.data.datasets;
		} else {
			this.showTrend = true;
			this.cantidad = data.actual;
			const trendNumber =
				this.cantidadDiaAnterior() === 0 ?
					0 : Math.round(100 * Math.abs(this.cantidadDiaAnterior() - data.actual) / this.cantidadDiaAnterior()) / 100;
			this.trend.icon = this.cantidadDiaAnterior() - data.actual > 0 ? 'trending_up' : 'trending_down';
			this.trend.number = this.cantidadDiaAnterior() - data.actual > 0 ? '+' + trendNumber : '-' + trendNumber;
			this.trend.color = this.cantidadDiaAnterior() - data.actual > 0 ? '#4caf50' : '#b6111a';
			chartWidget.options = data.historico.type === 'doughnut' ? this.optionsDona : this.optionsChart;
			chartWidget.type = data.historico.type;
			chartWidget.data.labels = data.historico.data.labels;
			chartWidget.data.datasets = data.historico.data.datasets;
		}
		this.chartWidget.next(chartWidget);
	}

	ngAfterViewInit() {



	}

	cantidadDiaAnterior = () => this.data.value.historico.data.datasets[0].data[this.data.value.historico.data.datasets[0].data.length - 1];
}
