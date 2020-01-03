import { AfterViewInit, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DashboardChartService, DashboardSupervisoraCall } from '../../../services/dashboard-chart.service';

@Component({
	selector: 'crm-supervisor-call',
	templateUrl: './supervisor-call.component.html',
	styleUrls: ['./supervisor-call.component.scss']
})
export class SupervisorCallComponent implements AfterViewInit {
	private showBackButton = false;
	opcionesPosibles = [
		{ value: "hoy", nombre: "Hoy" },
		{ value: "ultimaSemana", nombre: "Ultima semana" },
		{ value: "ultimoMes", nombre: "Ultimos 30 dias" },
		{ value: "ultimos3Meses", nombre: "Ultimos 3 meses" },
		{ value: "ultimos6Meses", nombre: "Ultimos 6 meses" },
	];
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
			datasets: [

			]
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
			},
			onClick: this.clickVendedoras.bind(this)
		}
	});

	vendedorasHoy = {
		labels: ['Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita'
			, 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se'
			, 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?'],
		datasets: [
			{
				label: 'Vendidas',
				data: [1, 2, 5, 9, 78, 8, 6, 9, 7, 2, 78],
				backgroundColor: 'rgb(75, 192, 192)' // green
			},
			{
				label: 'Agendadas',
				data: [4, 9, 78, 8, 6, 9, 7, 2, 3, 4, 9],
				backgroundColor: 'rgb(255, 205, 86)' // yellow
			},
			{
				label: 'Rechazadas',
				data: [43, 56, 87, 9, 78, 8, 6, 9, 7, 2, 163],
				backgroundColor: 'rgb(255, 99, 132)' // red
			}
		]
	};

	vendedoras7Dias = {
		labels: ['Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita'
			, 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se'
			, 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?'],
		datasets: [
			{
				label: 'Vendidas',
				data: [9, 78, 8, 6, 9, 7, 2, 2, 5, 9, 78],
				backgroundColor: 'rgb(75, 192, 192)' // green
			},
			{
				label: 'Agendadas',
				data: [4, 0, 9, 78, 8, 6, 9, 7, 2, 4, 9],
				backgroundColor: 'rgb(255, 205, 86)' // yellow
			},
			{
				label: 'Rechazadas',
				data: [43, 9, 78, 8, 6, 9, 7, 2, 87, 45, 163],
				backgroundColor: 'rgb(255, 99, 132)' // red
			}
		]
	};

	vendedoras30Dias = {
		labels: ['Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita'
			, 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se'
			, 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?'],
		datasets: [
			{
				label: 'Vendidas',
				data: [1, 2, 5, 9, 9, 78, 8, 6, 9, 7, 2],
				backgroundColor: 'rgb(75, 192, 192)' // green
			},
			{
				label: 'Agendadas',
				data: [9, 78, 8, 6, 9, 7, 2, 0, 3, 4, 9],
				backgroundColor: 'rgb(255, 205, 86)' // yellow
			},
			{
				label: 'Rechazadas',
				data: [43, 56, 87, 45, 9, 78, 8, 6, 9, 7, 2],
				backgroundColor: 'rgb(255, 99, 132)' // red
			}
		]
	};

	vendedoras3Meses = {
		labels: ['Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita'
			, 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se'
			, 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?'],
		datasets: [
			{
				label: 'Vendidas',
				data: [1, 2, 9, 78, 8, 6, 9, 7, 2, 9, 78],
				backgroundColor: 'rgb(75, 192, 192)' // green
			},
			{
				label: 'Agendadas',
				data: [9, 78, 8, 6, 9, 7, 2, 0, 3, 4, 9],
				backgroundColor: 'rgb(255, 205, 86)' // yellow
			},
			{
				label: 'Rechazadas',
				data: [43, 9, 78, 8, 6, 9, 7, 2, 87, 45, 163],
				backgroundColor: 'rgb(255, 99, 132)' // red
			}
		]
	};

	vendedoras6Meses = {
		labels: ['Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita'
			, 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se'
			, 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?'],
		datasets: [
			{
				label: 'Vendidas',
				data: [1, 2, 5, 9, 78, 8, 6, 9, 7, 2],
				backgroundColor: 'rgb(75, 192, 192)' // green
			},
			{
				label: 'Agendadas',
				data: [4, 0, 9, 78, 8, 6, 9, 7, 2, 4, 9],
				backgroundColor: 'rgb(255, 205, 86)' // yellow
			},
			{
				label: 'Rechazadas',
				data: [43, 56, 87, 9, 78, 8, 6, 9, 7, 2, 163],
				backgroundColor: 'rgb(255, 99, 132)' // red
			}
		]
	};
	carlitaDia = {
		labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
		datasets: [
			{
				label: 'Vendidas',
				data: [1, 2, 5, 9, 78],
				backgroundColor: 'rgb(75, 192, 192)' // green
			},
			{
				label: 'Agendadas',
				data: [4, 0, 3, 4, 9],
				backgroundColor: 'rgb(255, 205, 86)' // orange
			},
			{
				label: 'Rechazadas',
				data: [43, 56, 87, 45, 163],
				backgroundColor: 'rgb(255, 99, 132)' // red
			}
		]
	};

	carlitaMes = {
		labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'
			, 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		datasets: [
			{
				label: 'Vendidas',
				data: [1, 2, 5, 9, 78, 5, 6, 7, 21, 91, 2, 3],
				backgroundColor: 'rgb(75, 192, 192)' // green
			},
			{
				label: 'Agendadas',
				data: [1, 2, 5, 9, 78, 5, 6, 7, 21, 91, 2, 3],
				backgroundColor: 'rgb(255, 205, 86)' // yellow
			},
			{
				label: 'Rechazadas',
				data: [1, 2, 5, 9, 78, 5, 6, 7, 21, 91, 2, 3],
				backgroundColor: 'rgb(255, 99, 132)' // red
			}
		]
	};

	private dashboardData: DashboardSupervisoraCall;

	cambiarGeneral(value) {
		if (value == 'dia') {
			this.llenarChart(this.dashboardData.porDia.labels, this.dashboardData.porDia.datasets, "general");
		} else {
			console.log(this.dashboardData);
			this.llenarChart(this.dashboardData.porMes.labels, this.dashboardData.porMes.datasets, "general");
		}
	}

	cambiarVendedoras(value) {
		if (this.showBackButton == false) {
			this.llenarChart(this.dashboardData.vendedoras[value].labels, this.dashboardData.vendedoras[value].datasets, "vendedoras");
		} else {
			if (value == 'dia') {
				this.chartSrv.charts.find(v => v.id === "vendedoras").config.data = this.carlitaDia;
			} else {
				this.chartSrv.charts.find(v => v.id === "vendedoras").config.data = this.carlitaMes;
			}
		}
		this.chartSrv.charts.find(v => v.id === "vendedoras").update();
	}

	clickVendedoras(event) {
		const activePoints = this.chartSrv.charts.find(v => v.id === "vendedoras").chart.getElementsAtEvent(event);
		if (activePoints.length > 0) {
			const clickedElementindex = activePoints[0]['_index'];
			const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'
				, 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
			const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
			const label = this.chartSrv.charts.find(v => v.id === "vendedoras").data.labels[clickedElementindex];
			if (meses.includes(label) || dias.includes(label)) {
				return;
			}
			this.cambiarAVendedora(clickedElementindex, label);
			this.cambiarVendedoras('dia');
		}
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

	constructor(public chartSrv: DashboardChartService) {
	}


	ngAfterViewInit() {
		this.chartSrv.trarDatosDashboardSupervisorCall().subscribe(dashboard => {
			this.dashboardData = dashboard;
			this.llenarChart(dashboard.porDia.labels, dashboard.porDia.datasets, this.supervisorChart);
			this.llenarChart(dashboard.vendedoras.hoy.labels, dashboard.vendedoras.hoy.datasets, this.vendedorasChart);
			console.log(this.dashboardData);
		});
	}

	llenarChart(labels, dataset, observable) {
		const chart = observable.value;
		chart.data.labels = labels;
		chart.data.datasets = dataset;
		observable.next(chart);
	}


}
