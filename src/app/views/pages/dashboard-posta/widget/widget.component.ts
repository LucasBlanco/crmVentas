import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {DashboardChartService} from "@servicios/dashboard-chart.service";



@Component({
	selector: 'crm-widget',
	templateUrl: './widget.component.html',
	styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, AfterViewInit {
	@Input() titulo = '';
	@Input() icon= '';
	@Input() data;
	@Input() id = ''
	@Input() tieneOpciones=false
	@Input() selectOptions = []
	cantidad = 0;
	private chartWidget = {
		type: '',
		data: {
			labels: [],
			datasets: [

			]
		},
		options: {}

	};

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
	}

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
	}

	getChartInstance = () => this.chartSrv.charts.filter(c => c.id===this.id)[0].chart

	cambiarDeOpcion(value) {
			this.getChartInstance().config.data.labels =this.data[value].historico.data.labels
			this.getChartInstance().config.data.datasets =this.data[value].historico.data.datasets
			this.getChartInstance().update();
	}

	constructor(public chartSrv: DashboardChartService) {
	}

	ngOnInit() {

	}

	ngAfterViewInit(){


		if(this.selectOptions.length > 0)
		{
			this.cantidad = this.data[this.selectOptions[1].value].actual
			this.getChartInstance().options = this.data[this.selectOptions[1].value].historico.type === "doughnut" ? this.optionsDona : this.optionsChart;
			this.getChartInstance().config.type = this.data[this.selectOptions[1].value].historico.type
			this.getChartInstance().config.data.labels = this.data[this.selectOptions[1].value].historico.data.labels
			this.getChartInstance().config.data.datasets = this.data[this.selectOptions[1].value].historico.data.datasets
			this.getChartInstance().update();
		} else {
			this.cantidad = this.data.actual
			this.getChartInstance().options = this.data.historico.type == "doughnut" ? this.optionsDona : this.optionsChart;
			this.getChartInstance().config.type = this.data.historico.type
			this.getChartInstance().config.data.labels = this.data.historico.data.labels
			this.getChartInstance().config.data.datasets = this.data.historico.data.datasets
			this.getChartInstance().update();
		}

		console.log(this.getChartInstance())
	}
}
