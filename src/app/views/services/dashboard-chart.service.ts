import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BarChart } from '@modelos/charts/bar';
import { Chart, ChartDataSet, ChartEjeXTiempo } from '@modelos/charts/Charts';
import { DonaChart } from '@modelos/charts/dona';
import { LineChart } from '@modelos/charts/line';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

class ColorPalette {
	constructor(private nroColores: number) { }
	ultimoIndice = -1;
	colors = [
		'#1AC8ED',
		'#4392F1',
		'#FFC15E',
		'#2A2A72',
		'#EE6352',
		'#7FBEAB',
		'#FCB5B5',
		'#087E8B',
		'#ECB0E1',
		'#C9DDFF',
		'#C0C781',
		'#DEB986',
		'#F7B05B',
	];
	proximoColor() {
		this.ultimoIndice = (this.ultimoIndice > this.nroColores - 1) ? 0 : this.ultimoIndice + 1;
		return this.colors[this.ultimoIndice];
	}
}

@Injectable({
	providedIn: 'root'
})
export class DashboardChartService {
	public charts = [];
	constructor(private http: HttpClient) { }

	trarDatosDashboardSupervisorCall() {
		return this.http.get<ChartEjeXTiempo>(environment.ip + '/dashboard/supervisorCall?XDEBUG_SESSION_START=PHPSTORM').pipe(
			map(fuentes => this.mapDashboard(fuentes))
		);
	}

	agregarChart({ id, chart }) {
		this.charts.push({ id, chart });
	}

	borrarChart(id) {
		const chart = this.charts.find(c => c.id === id);
		if (!chart) { return; }
		chart.chart.destroy();
		this.charts = this.charts.filter(c => c.id === id);
	}

	random_rgba() {
		const o = Math.round;
		const r = Math.random;
		const s = 255;
		return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
	}

	mapDashboard(data) {
		const porMes = this.mapChartPorMes(data);
		const porDia = this.mapChartPodDia(data);
		const indicadorVentas = this.mapWidgetVentas(data);
		const indicadorAgendados = this.mapWidgetAgendados(data);
		const indicadorRellamados = this.mapWidgetRellamados(data);
		const rechazos = this.mapWidgetRechazos(data);
		const vendedoras = this.mapChartVendedoras(data);
		return new DashboardSupervisoraCall({
			porMes,
			porDia,
			indicadores: { ventas: indicadorVentas, rellamados: indicadorRellamados, agendados: indicadorAgendados },
			rechazos,
			vendedoras
		});
	}

	mapChartPorMes(data) {
		const porMes = data.datosTratados.tiempo.porMes;
		const labelsDuplicadas = porMes.map(datosPorDia => datosPorDia.nombreMes);
		const labels = labelsDuplicadas.filter((e, i) => labelsDuplicadas.indexOf(e) === i);
		const labelsDataSetDuplicadas = porMes.map(datosPorDia => datosPorDia.estadoNuevo);
		const labelsDataSet = labelsDataSetDuplicadas.filter((e, i) => labelsDataSetDuplicadas.indexOf(e) === i);
		const colorPalette = new ColorPalette(labelsDataSet.length);
		const dataSet = labelsDataSet.map(estado => {
			const color = colorPalette.proximoColor();
			return new ChartDataSet({
				label: estado,
				data: porMes
					.filter(x => x.estadoNuevo === estado)
					.map(x => x.cantidad),
				backgroundColor: color,
				borderColor: color
			});
		});
		return new ChartEjeXTiempo({ labels, datasets: dataSet });
	}

	mapChartPodDia(data) {
		const porTiempo = data.datosTratados.tiempo;
		const labelsDuplicadas = porTiempo.porDia.map(datosPorDia => datosPorDia.dia);
		const labelsDataSetDuplicadas = porTiempo.porDia.map(datosPorDia => datosPorDia.estadoNuevo);
		const labels = porTiempo.porDia.map(datosPorDia => datosPorDia.dia).filter((e, i) => labelsDuplicadas.indexOf(e) === i);
		const labelsDataSet = porTiempo.porDia.map(d => d.estadoNuevo).filter((e, i) => labelsDataSetDuplicadas.indexOf(e) === i);
		const colorPalette = new ColorPalette(labelsDataSet.length);
		const dataSet = labelsDataSet.map(estado => {
			const color = colorPalette.proximoColor();
			return new ChartDataSet({
				label: estado,
				data: labels.map(dia => {
					const _dia = porTiempo.porDia.find(d => d.dia === dia && d.estadoNuevo === estado);
					return _dia.cantidad;
				}),
				backgroundColor: color,
				borderColor: color
			});
		});
		return new ChartEjeXTiempo({ labels, datasets: dataSet });
	}

	mapWidgetVentas(data) {
		const valorActual = data.indicador.cantidadVentasDelDia.actual;
		const historico = data.indicador.cantidadVentasDelDia.historico;
		const labels = historico.map(x => x.dia);
		const dataset = historico.map(x => x.cantidad);
		const ventasChart = new LineChart({
			type: "line",
			data: {
				labels,
				datasets: [{
					label: "ventas",
					fill: "false",
					borderColor: '#92ff86',
					clip: 0,
					backgroundColor: '#92ff86',
					data: dataset
				}]
			}
		});
		return new Indicador({ actual: valorActual, historico: ventasChart });
	}

	mapWidgetAgendados(data) {
		const valorActual = data.indicador.agendadosPendientesDelDia.actual;
		const historico = data.indicador.agendadosPendientesDelDia.historico;
		const labels = historico.map(x => x.dia);
		const dataset = historico.map(x => x.cantidad);
		const ventasChart = new BarChart({ type: "bar", data: { labels: labels, datasets: [{ label: "ventas", borderColor: '#3dc892', backgroundColor: '#3dc892', data: dataset, minBarLength: 2 }] } });
		return new Indicador({ actual: valorActual, historico: ventasChart });
	}

	mapWidgetRellamados(data) {
		const valorActual = data.indicador.rellamadosPendientesDelDia.actual;
		const historico = data.indicador.rellamadosPendientesDelDia.historico;
		const labels = historico.map(x => x.dia);
		const dataset = historico.map(x => x.cantidad);
		const ventasChart = new BarChart({ type: "bar", data: { labels: labels, datasets: [{ label: "ventas", borderColor: '#4b70b4', backgroundColor: '#4b70b4', data: dataset, minBarLength: 2 }] } });
		return new Indicador({ actual: valorActual, historico: ventasChart });
	}

	mapWidgetRechazos(data) {
		const hoy = new IndicadorDona(this.mapRechazos(data, "hoy"));
		const ultimaSemana = new IndicadorDona(this.mapRechazos(data, "ultimaSemana"));
		const ultimoMes = new IndicadorDona(this.mapRechazos(data, "ultimoMes"));
		const ultimos3Meses = new IndicadorDona(this.mapRechazos(data, "ultimos3Meses"));
		const ultimos6Meses = new IndicadorDona(this.mapRechazos(data, "ultimos6Meses"));
		return { hoy, ultimaSemana, ultimoMes, ultimos3Meses, ultimos6Meses };
	}

	mapRechazos(data, index) {
		const valor = data.rechazos[index].map(rechazos => rechazos.cantidad).reduce((a, b) => a + b, 0);
		const labels = data.rechazos[index].map(rechazos => rechazos.estadoNuevo);
		const cantidad = data.rechazos[index].map(rechazos => rechazos.cantidad);
		const chart = new DonaChart({ type: 'doughnut', data: { labels: labels, datasets: [{ data: cantidad, backgroundColor: ['rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)', 'rgb(100, 200, 43)'] }] } });
		return { actual: valor, historico: chart };
	}

	mapChartVendedoras(data) {
		const hoy = this.mapChartVendedorasPorTiempo(data, "hoy");
		const ultimaSemana = this.mapChartVendedorasPorTiempo(data, "ultimaSemana");
		const ultimoMes = this.mapChartVendedorasPorTiempo(data, "ultimoMes");
		const ultimos3Meses = this.mapChartVendedorasPorTiempo(data, "ultimos3Meses");
		const ultimos6Meses = this.mapChartVendedorasPorTiempo(data, "ultimos6Meses");
		return { hoy, ultimos6Meses, ultimaSemana, ultimoMes, ultimos3Meses };
	}

	mapChartVendedorasPorTiempo(data, tiempo) {
		const datos = data.datosTratados.vendedoras[tiempo];
		const labelsDuplicadas = datos.map(d => d.nombre);
		const labels = labelsDuplicadas.filter((e, i) => labelsDuplicadas.indexOf(e) === i);
		const labelsDataSetDuplicadas = datos.map(datosPorDia => datosPorDia.estadoNuevo);
		const labelsDataSet = labelsDataSetDuplicadas.filter((e, i) => labelsDataSetDuplicadas.indexOf(e) === i);
		const dataSet = labelsDataSet.map(estado => new ChartDataSet({
			label: estado,
			data: datos
				.filter(x => x.estadoNuevo === estado)
				.map(x => x.cantidad),
			backgroundColor: this.random_rgba(),
			borderColor: this.random_rgba()
		}));
		return new ChartEjeXTiempo({ labels, datasets: dataSet });
	}
}

export interface IDashboardSupervisoraCall {
	porDia: ChartEjeXTiempo;
	porMes: ChartEjeXTiempo;
	indicadores: { ventas: Indicador, agendados: Indicador, rellamados: Indicador; };
	rechazos: {
		hoy: IndicadorDona,
		ultimaSemana: IndicadorDona,
		ultimoMes: IndicadorDona,
		ultimos3Meses: IndicadorDona,
		ultimos6Meses: IndicadorDona;
	};
	vendedoras: {
		hoy: ChartEjeXTiempo,
		ultimaSemana: ChartEjeXTiempo,
		ultimoMes: ChartEjeXTiempo,
		ultimos3Meses: ChartEjeXTiempo,
		ultimos6Meses: ChartEjeXTiempo;
	};
}

export class DashboardSupervisoraCall implements IDashboardSupervisoraCall {
	porDia: ChartEjeXTiempo;
	porMes: ChartEjeXTiempo;
	indicadores: { ventas: Indicador, agendados: Indicador, rellamados: Indicador; };
	rechazos: {
		hoy: IndicadorDona,
		ultimaSemana: IndicadorDona,
		ultimoMes: IndicadorDona,
		ultimos3Meses: IndicadorDona,
		ultimos6Meses: IndicadorDona;
	};
	vendedoras: {
		hoy: ChartEjeXTiempo,
		ultimaSemana: ChartEjeXTiempo,
		ultimoMes: ChartEjeXTiempo,
		ultimos3Meses: ChartEjeXTiempo,
		ultimos6Meses: ChartEjeXTiempo;
	};
	constructor(contacto: IDashboardSupervisoraCall) {
		this.porDia = contacto.porDia;
		this.porMes = contacto.porMes;
		this.indicadores = { ventas: contacto.indicadores.ventas, agendados: contacto.indicadores.agendados, rellamados: contacto.indicadores.rellamados };
		this.rechazos = {
			hoy: contacto.rechazos.hoy,
			ultimaSemana: contacto.rechazos.ultimaSemana,
			ultimoMes: contacto.rechazos.ultimoMes,
			ultimos3Meses: contacto.rechazos.ultimos3Meses,
			ultimos6Meses: contacto.rechazos.ultimos6Meses
		};
		this.vendedoras = {
			hoy: contacto.vendedoras.hoy,
			ultimaSemana: contacto.vendedoras.ultimaSemana,
			ultimoMes: contacto.vendedoras.ultimoMes,
			ultimos3Meses: contacto.vendedoras.ultimos3Meses,
			ultimos6Meses: contacto.vendedoras.ultimos6Meses
		};

	}
}

export interface IIndicador {
	actual: number,
	historico: Chart;
}

export class Indicador implements IIndicador {
	actual: number;
	historico: Chart;
	constructor(contacto: IIndicador) {
		this.actual = contacto.actual;
		this.historico = contacto.historico;
	}
}

export interface IIndicadorDona {
	actual: number,
	historico: DonaChart;
}

export class IndicadorDona implements IIndicadorDona {
	actual: number;
	historico: DonaChart;
	constructor(contacto: IIndicadorDona) {
		this.actual = contacto.actual;
		this.historico = contacto.historico;
	}
}








