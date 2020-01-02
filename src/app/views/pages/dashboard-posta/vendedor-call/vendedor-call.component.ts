import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
	DashboardChartService,
	DashboardSupervisoraCall
} from '../../../services/dashboard-chart.service';

@Component({
	selector: 'crm-vendedor-call',
	templateUrl: './vendedor-call.component.html',
	styleUrls: ['./vendedor-call.component.scss']
})
export class VendedorCallComponent implements OnInit, AfterViewInit {
	private showBackButton = false;
	opcionesPosibles = [
		{ value: "hoy", nombre: "Hoy" },
		{ value: "ultimaSemana", nombre: "Ultima semana" },
		{ value: "ultimoMes", nombre: "Ultimos 30 dias" },
		{ value: "ultimos3Meses", nombre: "Ultimos 3 meses" },
		{ value: "ultimos6Meses", nombre: "Ultimos 6 meses" },
	]
	private supervisorChart = {
		type: 'bar',
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
	};
	private generalDia = {
		labels: ['Lunes', 'Mates', 'Miércoles', 'Jueves', 'Viernes'],
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

	private generalMes = {
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

	private vendedorasChart = {
		type: 'horizontalBar',
		data: {
			labels: ['Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita'
				, 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se'
				, 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?'],
			datasets: [
				{
					label: 'Vendidas',
					data: [1, 2, 5, 9, 78, 8, 6, 9, 7, 2, 78],
					backgroundColor: 'rgb(75, 192, 192)' // green
				}
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
			}
		}
	};

	vendedorasHoy = {
		labels: ['Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita'
			, 'Carlita2', 'No se', 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se'
			, 'No se 2', 'Carlita3?', 'Carlita', 'Carlita2', 'No se', 'No se 2', 'Carlita3?'],
		datasets: [
			{
				label: 'Vendidas',
				data: [1, 2, 5, 9, 78, 8, 6, 9, 7, 2, 78],
				backgroundColor: 'rgb(75, 192, 192)' // green
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
			}
		]
	}

	private dashboardData: DashboardSupervisoraCall

	cambiarGeneral(value) {
		if (value == 'dia') {
			this.llenarChart(this.dashboardData.porDia.labels, this.dashboardData.porDia.datasets, "general");
		} else {
			console.log(this.dashboardData)
			this.llenarChart(this.dashboardData.porMes.labels, this.dashboardData.porMes.datasets, "general");
		}
	}

	cambiarVendedoras(value) {
		if (this.showBackButton == false) {
			if (value == 'hoy') {
				this.chartSrv.charts[5].config.data = this.vendedorasHoy;
			} else if (value == '7dias') {
				this.chartSrv.charts[5].config.data = this.vendedoras7Dias;
			} else if (value == '30dias') {
				this.chartSrv.charts[5].config.data = this.vendedoras30Dias;
			} else if (value == '3meses') {
				this.chartSrv.charts[5].config.data = this.vendedoras3Meses;
			} else if (value == '6meses') {
				this.chartSrv.charts[5].config.data = this.vendedoras6Meses;
			}
		} else {
			if (value == 'dia') {
				this.chartSrv.charts[5].config.data = this.carlitaDia;
			} else {
				this.chartSrv.charts[5].config.data = this.carlitaMes;
			}
		}
		this.chartSrv.charts[5].update();
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



	ngOnInit() {
		console.log(this.supervisorChart)
		this.chartSrv.trarDatosDashboardSupervisorCall().subscribe(dashboard => {
			this.dashboardData = dashboard
			this.llenarChart(dashboard.porDia.labels, dashboard.porDia.datasets, "general")
			console.log(this.dashboardData)
		})


	}

	llenarChart(labels, dataset, index) {

		this.chartSrv.charts.filter(c => c.id === index)[0].chart.config.data.labels = labels
		this.chartSrv.charts.filter(c => c.id === index)[0].chart.config.data.datasets = dataset
		this.chartSrv.charts.filter(c => c.id === index)[0].chart.update();
	}

	ngAfterViewInit() {


	}
}
