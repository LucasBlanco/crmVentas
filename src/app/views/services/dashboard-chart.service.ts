import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operador } from '@modelos/operador';
import * as moment from 'moment';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
    Estados,
    EstadosRechazoAgrupados,
    nombreEstadoAgrupado,
    nombreEstadoAgrupadoConDetalleRechazo,
} from '../enums/estados';
import { Perfiles } from './../enums/perfiles';
import { OperadoresService } from './operadores.service';


class ColorPalette {
	constructor(private nroColores: number) { }
	ultimoIndice = -1;
	colors = [
		'#1c84c6',
		'#1ab394',
		'#23c6c8',
		'#ed5565',
		'#f6db5f',
		'#FCB5B5',
		'#f8ac59',
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

export class WidgetData {

	labels: string[];
	datasets: any[];
	constructor(chart) {
		this.labels = chart.labels;
		this.datasets = chart.datasets;
	}

	get valorActual() {
		const index = this.labels.findIndex(l => l === moment().format('YYYY-MM-DD'));
		return this.datasets[0].data[index];
	}
}

@Injectable({
	providedIn: 'root'
})
export class DashboardChartService {
	public charts = [];
	constructor(private http: HttpClient, private operadorSrv: OperadoresService) { }
	ventas = new Subject();
	estados = [
		Estados.CREADO,
		Estados.AGENDADO,
		Estados.RELLAMADO,
		EstadosRechazoAgrupados.NO_INTERESA,
		EstadosRechazoAgrupados.INCONTACTABLE,
		EstadosRechazoAgrupados.OTRO_RECHAZO
	];

	traerVentas({ fechaDesde, fechaHasta }) {
		const params = {
			desde: fechaDesde,
			hasta: fechaHasta,
			'groupBy[]': 'porDia',
			'filters[perfiles][]': Perfiles.OPERADOR_VENTA
		};
		return this.http.get<{ cantidad: number, fecha: string; }[]>(`${environment.ip}/estadistica/cantidadEstados`, { params }).pipe(
			map(ventas => new WidgetData(this.completarUltimaSemana(ventas)))
		);
	}
	traerVentasUltimaSemana = () => this.traerVentas(this.rangoUltimaSemana());

	traerAgendados({ fechaDesde, fechaHasta }) {
		const params = {
			desde: fechaDesde,
			hasta: fechaHasta,
			rellamados: 'false',
			'filters[perfiles][]': Perfiles.OPERADOR_VENTA
		};
		return this.http.get<{ cantidad: number, fecha: string; }[]>(`${environment.ip}/estadistica/cantidadAgendados`, { params }).pipe(
			map(ventas => new WidgetData(this.completarUltimaSemana(ventas)))
		);
	}
	traerAgendadosUltimaSemana = () => this.traerAgendados(this.rangoUltimaSemana());

	traerRellamados({ fechaDesde, fechaHasta }) {
		const params = {
			desde: fechaDesde,
			hasta: fechaHasta,
			rellamados: 'true',
			'filters[perfiles][]': Perfiles.OPERADOR_VENTA
		};
		return this.http.get<{ cantidad: number, fecha: string; }[]>(`${environment.ip}/estadistica/cantidadAgendados`, { params }).pipe(
			map(ventas => new WidgetData(this.completarUltimaSemana(ventas)))
		);
	}
	traerRellamadosUltimaSemana = () => this.traerRellamados(this.rangoUltimaSemana());

	traerVentasPorEstado({ fechaDesde, fechaHasta }, periodo: 'porDia' | 'porMes') {
		const params = new HttpParams()
			.append('desde', fechaDesde)
			.append('hasta', fechaHasta)
			.append('groupBy[]', 'ultimoEstado')
			.append('groupBy[]', periodo)
			.append('filters[perfiles][]', Perfiles.OPERADOR_VENTA);
		return this.http.get<{ cantidad: number, ultimoEstado: Estados, fecha: string; }[]>(
			`${environment.ip}/estadistica/cantidadEstados`, { params }
		).pipe(
			map(ventas => this.mapVentasPorEstado(ventas, periodo === 'porDia' ? this.diasUltimaSemana() : this.mesesUltimoAño()))
		);
	}

	traerVentasPorEstadoUltimaSemana = () => this.traerVentasPorEstado(this.rangoUltimaSemana(), 'porDia');
	traerVentasPorEstadoUltimoAño = () => this.traerVentasPorEstado(this.rangoUltimoAño(), 'porMes');

	mapVentasPorEstado(ventas: { cantidad: number, ultimoEstado: Estados; fecha: string; }[], labels) {
		const datasetsLabels = this.estados;
		const dataALlenar = labels.map(s => {
			return this.estados.map(e => ({ cantidad: 0, ultimoEstado: e, fecha: s }));
		}).flat();
		const dataConRechazosAgrupados = ventas
			.map(v => ({ ...v, ultimoEstado: nombreEstadoAgrupado(v.ultimoEstado) }))
			.reduce(this.sumarCantidadEstadosRepetidos(['ultimoEstado', 'fecha']), []);
		dataConRechazosAgrupados.forEach(d => {
			const indice = dataALlenar.findIndex(e => e.ultimoEstado === d.ultimoEstado && e.fecha === d.fecha);
			if (indice !== -1) {
				dataALlenar[indice] = d;
			}
		});
		const colorPalette = new ColorPalette(datasetsLabels.length);
		const datasets = datasetsLabels.map(label => {
			const color = colorPalette.proximoColor();
			return {
				label,
				data: dataALlenar.filter(d => d.ultimoEstado === label).map(d => d.cantidad),
				backgroundColor: color,
				borderColor: color
			};
		});
		return { labels, datasets };
	}

	traerRechazos({ fechaDesde, fechaHasta }) {
		const params = new HttpParams()
			.append('desde', fechaDesde)
			.append('hasta', fechaHasta)
			.append('groupBy[]', 'ultimoEstado')
			.append('filters[perfiles][]', Perfiles.OPERADOR_VENTA);
		return this.http.get<{ cantidad: number, ultimoEstado: Estados; }[]>(
			`${environment.ip}/estadistica/cantidadEstados`, { params }
		).pipe(
			map(this.mapRechazos.bind(this))
		);
	}

	mapRechazos(ventas: { cantidad: number, ultimoEstado: Estados; }[]) {
		const rechazos = ventas.filter(v => v.ultimoEstado.toLowerCase().includes('rechazo'));
		const estados = [
			Estados.RECHAZO_NO_DISPONIBLE,
			Estados.RECHAZO_INEXISTENTE,
			Estados.RECHAZO_NO_CONTESTA,
			Estados.RECHAZO_EQUIVOCADO,
			Estados.RECHAZO_NO_LE_INTERESA,
			EstadosRechazoAgrupados.OTRO_RECHAZO
		];
		const rechazosALlenar = estados.map(e => ({ ultimoEstado: e, cantidad: 0 }));
		const rechazosAgrupados = rechazos
			.map(r => ({ ...r, ultimoEstado: nombreEstadoAgrupadoConDetalleRechazo(r.ultimoEstado) }))
			.reduce(this.sumarCantidadEstadosRepetidos(['ultimoEstado']), []);
		rechazosAgrupados.forEach(d => {
			const indice = rechazosALlenar.findIndex(e => e.ultimoEstado === d.ultimoEstado);
			if (indice !== -1) {
				rechazosALlenar[indice] = d;
			}
		});
		const colorPalette = new ColorPalette(rechazosALlenar.length);
		const colores = rechazosALlenar.map(() => colorPalette.proximoColor());
		const labels = rechazosALlenar.map(r => r.ultimoEstado);
		const datasets = {
			label: 'cantidad',
			data: rechazosALlenar.map(d => d.cantidad),
			backgroundColor: colores,
			borderColor: colores
		};
		return { labels, datasets: [datasets] };
	}

	traerRechazosHoy = () => this.traerRechazos(this.rangoHoy());
	traerRechazosUltimaSemana = () => this.traerRechazos(this.rangoUltimaSemana());
	traerRechazosUltimoMes = () => this.traerRechazos(this.rangoUltimoMes());
	traerRechazosUltimos3Meses = () => this.traerRechazos(this.rangoUltimos3Meses());
	traerRechazosUltimos6Meses = () => this.traerRechazos(this.rangoUltimos6Meses());

	traerVentasPorEstadoPorVendedora({ fechaDesde, fechaHasta }): Observable<{ labels: any[], datasets: any[]; }> {
		const params = new HttpParams()
			.append('desde', fechaDesde)
			.append('hasta', fechaHasta)
			.append('groupBy[]', 'ultimoEstado')
			.append('groupBy[]', 'usuario')
			.append('filters[perfiles][]', Perfiles.OPERADOR_VENTA);
		const ventas$ = this.http.get<{ cantidad: number, ultimoEstado: Estados, usuario: string; }[]>(
			`${environment.ip}/estadistica/cantidadEstados`, { params }
		);
		const vendedoras$ = this.operadorSrv.traerTodos();
		return combineLatest([ventas$, vendedoras$]).pipe(
			map(([ventas, vendedoras]) => this.mapVentasPorEstadoPorVendedora(ventas, vendedoras))
		);
	}

	traerVentasPorEstadoPorVendedoraHoy = () => this.traerVentasPorEstadoPorVendedora(this.rangoHoy());
	traerVentasPorEstadoPorVendedoraUltimaSemana = () => this.traerVentasPorEstadoPorVendedora(this.rangoUltimaSemana());
	traerVentasPorEstadoPorVendedoraUltimoMes = () => this.traerVentasPorEstadoPorVendedora(this.rangoUltimoMes());
	traerVentasPorEstadoPorVendedoraUltimos3Meses = () => this.traerVentasPorEstadoPorVendedora(this.rangoUltimos3Meses());
	traerVentasPorEstadoPorVendedoraUltimos6Meses = () => this.traerVentasPorEstadoPorVendedora(this.rangoUltimos6Meses());

	mapVentasPorEstadoPorVendedora(ventas: { cantidad: number, ultimoEstado: Estados, usuario: string; }[], vendedoras: Operador[]) {
		const datasetsLabels = this.estados;
		const usuarios = vendedoras.map(v => v.nombre); // sin repetidos
		const dataALlenar = usuarios.map(usuario => {
			return this.estados.map(e => ({ cantidad: 0, ultimoEstado: e, usuario }));
		}).flat();
		const dataConRechazosAgrupados = ventas
			.map(v => ({ ...v, ultimoEstado: nombreEstadoAgrupado(v.ultimoEstado) }))
			.reduce(this.sumarCantidadEstadosRepetidos(['ultimoEstado', 'usuario']), []);
		dataConRechazosAgrupados.forEach(d => {
			const indice = dataALlenar.findIndex(e => e.ultimoEstado === d.ultimoEstado && e.usuario === d.usuario);
			if (indice !== -1) {
				dataALlenar[indice] = d;
			}
		});
		const colorPalette = new ColorPalette(datasetsLabels.length);
		const datasets = datasetsLabels.map(label => {
			const color = colorPalette.proximoColor();
			return {
				label,
				data: usuarios.map(u => dataALlenar.find(d => d.usuario === u && d.ultimoEstado === label)).map(d => d.cantidad),
				backgroundColor: color,
				borderColor: color
			};
		});
		return { labels: usuarios, datasets };
	}



	ordenarPorFecha(a, b) {
		if (moment(a, 'YYYY-MM-DD').isBefore(moment(b, 'YYYY-MM-DD'))) {
			return -1;
		}
		return 1;
	}

	sumarCantidadEstadosRepetidos = (identificadores: string[]) => (array, valorActual) => {
		const condicion = e => identificadores.every(id => e[id] === valorActual[id]);
		const index = array.findIndex(condicion);
		if (index !== -1) {
			array[index].cantidad += valorActual.cantidad;
		} else {
			array.push(valorActual);
		}
		return array;
	};




	completarUltimaSemana(dias: { cantidad: number, fecha: string; }[]) {
		const labels = this.diasUltimaSemana();
		const data = this.diasUltimaSemana().map(dia => {
			const diaBack = dias.find(d => d.fecha === dia);
			return diaBack ? diaBack.cantidad : 0;
		});
		const color = new ColorPalette(1).proximoColor();
		return { labels, datasets: [{ label: 'cantidad', data, backgroundColor: color, borderColor: color }] };
	}

	rangoHoy() {
		return {
			fechaDesde: moment().format('YYYY-MM-DD'),
			fechaHasta: moment().format('YYYY-MM-DD')
		};
	}

	rangoUltimaSemana(): { fechaDesde: string, fechaHasta: string; } {
		return {
			fechaDesde: moment().add(-6, 'days').format('YYYY-MM-DD'),
			fechaHasta: moment().format('YYYY-MM-DD')
		};
	}

	rangoUltimoMes(): { fechaDesde: string, fechaHasta: string; } {
		return {
			fechaDesde: moment().add(-1, 'month').format('YYYY-MM-DD'),
			fechaHasta: moment().format('YYYY-MM-DD')
		};
	}

	rangoUltimos3Meses(): { fechaDesde: string, fechaHasta: string; } {
		return {
			fechaDesde: moment().add(-3, 'months').format('YYYY-MM-DD'),
			fechaHasta: moment().format('YYYY-MM-DD')
		};
	}

	rangoUltimos6Meses(): { fechaDesde: string, fechaHasta: string; } {
		return {
			fechaDesde: moment().add(-6, 'months').format('YYYY-MM-DD'),
			fechaHasta: moment().format('YYYY-MM-DD')
		};
	}

	rangoUltimoAño(): { fechaDesde: string, fechaHasta: string; } {
		return {
			fechaDesde: moment().add(-12, 'months').format('YYYY-MM-DD'),
			fechaHasta: moment().format('YYYY-MM-DD')
		};
	}
	diasUltimaSemana(): string[] {
		/*let diasUltimaSemana = [];
		for (let i = 0; i < 7; i++) {
			diasUltimaSemana = [moment().add(-i, 'days').format('YYYY-MM-DD'), ...diasUltimaSemana];
		}*/
		const diasUltimaSemana = [
			moment('2020-01-01', 'YYYY-MM-DD').format('YYYY-MM-DD'),
			moment('2020-01-02', 'YYYY-MM-DD').format('YYYY-MM-DD'),
			moment('2020-01-03', 'YYYY-MM-DD').format('YYYY-MM-DD'),
			moment('2020-01-04', 'YYYY-MM-DD').format('YYYY-MM-DD'),
			moment('2020-01-05', 'YYYY-MM-DD').format('YYYY-MM-DD'),
			moment('2020-01-06', 'YYYY-MM-DD').format('YYYY-MM-DD'),
			moment('2020-01-07', 'YYYY-MM-DD').format('YYYY-MM-DD')
		];
		return diasUltimaSemana;
	}

	mesesUltimoAño(): string[] {
		/*let mesesUltimoAño = [];
		for (let i = 0; i < 12; i++) {
			mesesUltimoAño = [moment().add(-i, 'month').format('YYYY-MM-DD'), ...mesesUltimoAño];
		}*/
		const mesesUltimoAño = [
			moment('2019-01', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-02', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-03', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-04', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-05', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-06', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-07', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-08', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-09', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-10', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-11', 'YYYY-MM').format('YYYY-MM'),
			moment('2019-12', 'YYYY-MM').format('YYYY-MM'),
			moment('2020-01', 'YYYY-MM').format('YYYY-MM')
		];
		return mesesUltimoAño;
	}

}









