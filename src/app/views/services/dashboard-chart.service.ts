import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Chart, ChartDataSet, ChartEjeXTiempo, IChartEjeXTiempo} from "@modelos/charts/Charts";
import {LineChart} from "@modelos/charts/line";
import {BarChart} from "@modelos/charts/bar";
import {DonaChart} from "@modelos/charts/dona";


@Injectable({
  providedIn: 'root'
})
export class DashboardChartService {
  public charts = [];
  constructor(private http: HttpClient) { }

  trarDatosDashboardSupervisorCall(){
	  return this.http.get<ChartEjeXTiempo>(environment.ip+'/dashboard/supervisorCall?XDEBUG_SESSION_START=PHPSTORM').pipe(
		  map(fuentes => this.mapDashboard(fuentes))
	  )
  }

	random_rgba() {
		var o = Math.round, r = Math.random, s = 255;
		return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
	}

  mapDashboard(data){
	const porMes = this.mapChartPorMes(data)
	const porDia = this.mapChartPodDia(data)
	  const indicadorVentas = this.mapWidgetVentas(data)
	  const indicadorAgendados = this.mapWidgetAgendados(data)
	  const indicadorRellamados = this.mapWidgetRellamados(data)
	  const rechazos = this.mapWidgetRechazos(data);
	  return new DashboardSupervisoraCall({porMes, porDia, indicadores:{ventas:indicadorVentas, rellamados:indicadorRellamados, agendados:indicadorAgendados}, rechazos:rechazos})
  }

  mapChartPorMes(data)  {
	  const porMes = data.datosTratados.tiempo.porMes
	  const labelsDuplicadas = porMes.map(datosPorDia => datosPorDia.nombreMes)
	  const labels = labelsDuplicadas.filter((e, i) => labelsDuplicadas.indexOf(e) === i)
	  const labelsDataSetDuplicadas = porMes.map(datosPorDia => datosPorDia.estadoNuevo)
	  const labelsDataSet = labelsDataSetDuplicadas.filter((e, i) => labelsDataSetDuplicadas.indexOf(e) === i)
	  const dataSet = labelsDataSet.map(estado => new ChartDataSet({
		  label: estado,
		  data: porMes
			  .filter(x => x.estadoNuevo === estado)
			  .map(x => x.cantidad),
		  backgroundColor: this.random_rgba(),
		  borderColor:this.random_rgba()
	  }))
	  return new ChartEjeXTiempo({labels, datasets:dataSet})
  }

  mapChartPodDia(data){
	  const porTiempo = data.datosTratados.tiempo
	  const labelsDuplicadas = porTiempo.porDia.map(datosPorDia => datosPorDia.dia)
	  const labelsDataSetDuplicadas = porTiempo.porDia.map(datosPorDia => datosPorDia.estadoNuevo)
	  const labels = porTiempo.porDia.map(datosPorDia => datosPorDia.dia).filter((e, i) => labelsDuplicadas.indexOf(e) === i)
	  const labelsDataSet = porTiempo.porDia.map(d => d.estadoNuevo).filter((e, i) => labelsDataSetDuplicadas.indexOf(e) === i)
	  const dataSet = labelsDataSet.map(estado => new ChartDataSet({
		  label: estado,
		  data: porTiempo.porDia
			  .filter(x => x.estadoNuevo === estado)
			  .map(x => x.cantidad),
		  backgroundColor: this.random_rgba(),
		  borderColor:this.random_rgba()
	  }))
	  return new ChartEjeXTiempo({labels, datasets:dataSet})
  }

  mapWidgetVentas(data){
	  const valorActual = data.indicador.cantidadVentasDelDia.actual
	  const historico = data.indicador.cantidadVentasDelDia.historico
	  const labels = historico.map(x => x.dia)
	  const dataset = historico.map(x=>x.cantidad)
	  const ventasChart = new LineChart({type:"line", data:{labels:labels, datasets:[{label:"ventas", fill:"false", borderColor:'#92ff86', clip:0, backgroundColor: '#92ff86', data:dataset}]}})
	  return new Indicador({actual:valorActual, historico:ventasChart})
  }

	mapWidgetAgendados(data){
		const valorActual = data.indicador.agendadosPendientesDelDia.actual
		const historico = data.indicador.agendadosPendientesDelDia.historico
		const labels = historico.map(x => x.dia)
		const dataset = historico.map(x=>x.cantidad)
		const ventasChart = new BarChart({type:"bar", data:{labels:labels, datasets:[{label:"ventas",  borderColor:'#3dc892', backgroundColor:'#3dc892', data:dataset, minBarLength:2}]}})
		return new Indicador({actual:valorActual, historico:ventasChart})
	}

	mapWidgetRellamados(data){
		const valorActual = data.indicador.rellamadosPendientesDelDia.actual
		const historico = data.indicador.rellamadosPendientesDelDia.historico
		const labels = historico.map(x => x.dia)
		const dataset = historico.map(x=>x.cantidad)
		const ventasChart = new BarChart({type:"bar", data:{labels:labels, datasets:[{label:"ventas",  borderColor:'#4b70b4', backgroundColor:'#4b70b4', data:dataset, minBarLength:2}]}})
		return new Indicador({actual:valorActual, historico:ventasChart})
	}

	mapWidgetRechazos(data){
		const hoy = new IndicadorDona(this.mapRechazos(data, "hoy"))
		const ultimaSemana = new IndicadorDona(this.mapRechazos(data, "ultimaSemana"))
		const ultimoMes= new IndicadorDona(this.mapRechazos(data, "ultimoMes"))
		const ultimos3Meses = new IndicadorDona(this.mapRechazos(data, "ultimos3Meses"))
		const ultimos6Meses = new IndicadorDona(this.mapRechazos(data, "ultimos6Meses"))
		return {hoy, ultimaSemana, ultimoMes, ultimos3Meses, ultimos6Meses}
	}

	mapRechazos(data, index){
		const valor = data.rechazos[index].map(rechazos => rechazos.cantidad).reduce((a, b) => a + b, 0)
		const labels = data.rechazos[index].map(rechazos => rechazos.estadoNuevo)
		const cantidad = data.rechazos[index].map(rechazos => rechazos.cantidad)
		const chart = new DonaChart({type:'doughnut', data:{labels:labels, datasets:[{data: cantidad, backgroundColor:['rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)','rgb(100, 200, 43)']}]}})
		return {actual:valor, historico:chart}
	}
}

export interface IDashboardSupervisoraCall{
	porDia: ChartEjeXTiempo;
	porMes: ChartEjeXTiempo;
	indicadores: {ventas:Indicador, agendados:Indicador, rellamados:Indicador}
	rechazos: {
		hoy:IndicadorDona,
		ultimaSemana:IndicadorDona,
		ultimoMes:IndicadorDona,
		ultimos3Meses:IndicadorDona,
		ultimos6Meses:IndicadorDona
	}
}

export class DashboardSupervisoraCall implements IDashboardSupervisoraCall {
	porDia: ChartEjeXTiempo;
	porMes: ChartEjeXTiempo;
	indicadores: {ventas:Indicador, agendados:Indicador, rellamados:Indicador};
	rechazos: {
		hoy:IndicadorDona,
		ultimaSemana:IndicadorDona,
		ultimoMes:IndicadorDona,
		ultimos3Meses:IndicadorDona,
		ultimos6Meses:IndicadorDona
	}
	constructor(contacto: IDashboardSupervisoraCall) {
		this.porDia= contacto.porDia;
		this.porMes= contacto.porMes;
		this.indicadores = {ventas: contacto.indicadores.ventas, agendados:contacto.indicadores.agendados, rellamados:contacto.indicadores.rellamados}
		this.rechazos = {hoy:contacto.rechazos.hoy,
			ultimaSemana:contacto.rechazos.ultimaSemana,
			ultimoMes:contacto.rechazos.ultimoMes,
			ultimos3Meses:contacto.rechazos.ultimos3Meses,
			ultimos6Meses:contacto.rechazos.ultimos6Meses
		}

	}
}

export interface IIndicador {
	actual:number,
	historico:Chart
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
	actual:number,
	historico:DonaChart
}

export class IndicadorDona implements IIndicadorDona {
	actual: number;
	historico: DonaChart;
	constructor(contacto: IIndicadorDona) {
		this.actual = contacto.actual;
		this.historico = contacto.historico;
	}
}








