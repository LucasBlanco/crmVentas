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
import { Fuente } from './../models/fuente';
import { FuentesService } from './fuentes.service';
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

export class Combinatoria {
	combinatoria;
	constructor(
		...elemsParaLaCombinatoria: { data: (string | number)[], nombre: string; }[]
	) {
		const [head, ...tail] = elemsParaLaCombinatoria.map(this.toArrayDeObjectos);
		this.combinatoria = tail.reduce((arrayFinal, elemActual) => {
			return arrayFinal.map(elem =>
				elemActual.map(otroElem => ({ ...elem, ...otroElem }))
			).flat();
		}, head);
	}

	private toArrayDeObjectos({ data, nombre }): object[] {
		// transforma cada elemento de la combinatoria en un array de objectos con el nombre correcspondiente
		return data.map(e => ({ [nombre]: e }));
	}

	agregarPropiedades(propiedades: { [key: string]: (string | number); }) {
		this.combinatoria = this.combinatoria.map(comb => ({ ...comb, ...propiedades }));
	}

	mergeBy(identificadores: string[], data: any[]) {
		this.combinatoria = this.combinatoria.map(comb => {
			const elemRepetido = data.find(d => identificadores.every(i => d[i] === comb[i]));
			return elemRepetido ? elemRepetido : comb;
		});
	}
}

@Injectable({
	providedIn: 'root'
})
export class DashboardChartService {
	constructor(private http: HttpClient, private operadorSrv: OperadoresService, private baseSrv: FuentesService) {
	}
	public charts = [];
	ventas = new Subject();
	dashboard: 'supervisoraCall' | 'vendedora';
	usuario;

	estados = [
		Estados.CREADO,
		Estados.AGENDADO,
		Estados.RELLAMADO,
		EstadosRechazoAgrupados.NO_INTERESA,
		EstadosRechazoAgrupados.INCONTACTABLE,
		EstadosRechazoAgrupados.OTRO_RECHAZO
	];

	estadosRechazo = [
		Estados.RECHAZO_NO_DISPONIBLE,
		Estados.RECHAZO_INEXISTENTE,
		Estados.RECHAZO_NO_CONTESTA,
		Estados.RECHAZO_EQUIVOCADO,
		Estados.RECHAZO_NO_LE_INTERESA,
		EstadosRechazoAgrupados.OTRO_RECHAZO
	];


	defaultHttpParams(fechaDesde, fechaHasta) {
		let params = new HttpParams()
			.append('desde', fechaDesde)
			.append('hasta', fechaHasta);
		if (this.dashboard === 'supervisoraCall') {
			params = params.append('filters[perfiles][]', Perfiles.OPERADOR_VENTA);
		} else if (this.dashboard === 'vendedora') {
			params = params.append('filters[usuarios][]', this.usuario);
		}
		return params;
	}
	defaultHttpParamsGroupByUltimoEstado(fechaDesde, fechaHasta) {
		return this.defaultHttpParams(fechaDesde, fechaHasta).append('groupBy[]', 'ultimoEstado');
	}

	renombrarUltimoEstadoRechazo = venta => ({ ...venta, ultimoEstado: nombreEstadoAgrupado(venta.ultimoEstado) });
	renombrarUltimoEstadoRechazoConDetalle = venta => ({ ...venta, ultimoEstado: nombreEstadoAgrupadoConDetalleRechazo(venta.ultimoEstado) });

	agruparEstados = (funcionRenombre) => (identificadores: string[]) => (data: any[]) => {
		const dataRenombrada = data.map(funcionRenombre);
		return dataRenombrada.reduce(this.combinarEstadosRepetidosSumandoCantidad(identificadores), []) as any[];
	};
	// tslint:disable-next-line: member-ordering
	agruparEstadosPorUltimoEstadoRechazoBy = this.agruparEstados(this.renombrarUltimoEstadoRechazo);
	// tslint:disable-next-line: member-ordering
	agruparEstadosPorUltimoEstadoRechazoConDetalleBy = this.agruparEstados(this.renombrarUltimoEstadoRechazoConDetalle);


	/* VENTAS */
	traerVentas({ fechaDesde, fechaHasta }) {
		const params = this.defaultHttpParams(fechaDesde, fechaHasta).append('groupBy[]', 'porDia');
		return this.http.get<{ cantidad: number, fecha: string; }[]>(`${environment.ip}/estadistica/cantidadEstados`, { params }).pipe(
			map(ventas => new WidgetData(this.completarUltimaSemana(ventas)))
		);
	}
	traerVentasUltimaSemana = () => this.traerVentas(this.rangoUltimaSemana());


	/* AGENDADOS */
	traerAgendados({ fechaDesde, fechaHasta }) {
		const params = this.defaultHttpParams(fechaDesde, fechaHasta).append('rellamados', 'false');
		return this.http.get<{ cantidad: number, fecha: string; }[]>(`${environment.ip}/estadistica/cantidadAgendados`, { params }).pipe(
			map(ventas => new WidgetData(this.completarUltimaSemana(ventas)))
		);
	}
	traerAgendadosUltimaSemana = () => this.traerAgendados(this.rangoUltimaSemana());


	/* RELLAMADOS */
	traerRellamados({ fechaDesde, fechaHasta }) {
		const params = this.defaultHttpParams(fechaDesde, fechaHasta).append('rellamados', 'true');
		return this.http.get<{ cantidad: number, fecha: string; }[]>(`${environment.ip}/estadistica/cantidadAgendados`, { params }).pipe(
			map(ventas => new WidgetData(this.completarUltimaSemana(ventas)))
		);
	}
	traerRellamadosUltimaSemana = () => this.traerRellamados(this.rangoUltimaSemana());

	/* POR ESTADO */
	traerVentasPorEstado({ fechaDesde, fechaHasta }, periodo: 'porDia' | 'porMes') {
		const params = this.defaultHttpParamsGroupByUltimoEstado(fechaDesde, fechaHasta).append('groupBy[]', periodo);
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
		const unaCombinatoria = new Combinatoria(
			{ data: this.estados, nombre: 'ultimoEstado' },
			{ data: labels, nombre: 'fecha' },
			{ data: [0], nombre: 'cantidad' }
		);
		const dataConRechazosAgrupados = this.agruparEstadosPorUltimoEstadoRechazoBy(['ultimoEstado', 'fecha'])(ventas);
		unaCombinatoria.mergeBy(['ultimoEstado', 'fecha'], dataConRechazosAgrupados);
		const colorPalette = new ColorPalette(datasetsLabels.length);
		const datasets = datasetsLabels.map(label => {
			const color = colorPalette.proximoColor();
			return {
				label,
				data: unaCombinatoria.combinatoria.filter(d => d.ultimoEstado === label).map(d => d.cantidad),
				backgroundColor: color,
				borderColor: color
			};
		});
		return { labels, datasets };
	}

	/* POR BASE */
	traerVentasPorBase({ fechaDesde, fechaHasta }) {
		const params = this.defaultHttpParamsGroupByUltimoEstado(fechaDesde, fechaHasta).append('groupBy[]', 'base');
		const ventas$ = this.http.get<{ cantidad: number, ultimoEstado: Estados, base: string; }[]>(
			`${environment.ip}/estadistica/cantidadEstados`, { params }
		);
		const bases$ = this.baseSrv.traerTodos('interna');
		return combineLatest([ventas$, bases$]).pipe(
			map(([ventas, bases]) => this.mapVentasPorBase(ventas, bases))
		);
	}
	traerVentasPorBaseUltimoAño = () => this.traerVentasPorBase(this.rangoUltimoAño());

	mapVentasPorBase(ventas: { cantidad: number, ultimoEstado: Estados, base: string; }[], bases: Fuente[]) {
		const nombreBases = bases.map(base => base.nombre);
		const labels = nombreBases;
		const unaCombinatoria = new Combinatoria(
			{ data: this.estados, nombre: 'ultimoEstado' },
			{ data: nombreBases, nombre: 'base' },
			{ data: [0], nombre: 'cantidad' }
		);
		unaCombinatoria.mergeBy(['ultimoEstado', 'base'], ventas);
		const ventasPorBase = unaCombinatoria.combinatoria;
		const colorPalette = new ColorPalette(labels.length);
		const datasets = this.estados.map(estado => {
			const color = colorPalette.proximoColor();
			return {
				label: estado,
				data: unaCombinatoria.combinatoria.filter(d => d.ultimoEstado === estado).map(d => d.cantidad),
				backgroundColor: color,
				borderColor: color
			};
		});
		return { labels, datasets };
	}

	/* RECHAZOS */
	traerRechazos({ fechaDesde, fechaHasta }) {
		const params = this.defaultHttpParamsGroupByUltimoEstado(fechaDesde, fechaHasta);
		return this.http.get<{ cantidad: number, ultimoEstado: Estados; }[]>(
			`${environment.ip}/estadistica/cantidadEstados`, { params }
		).pipe(
			map(this.mapRechazos.bind(this))
		);
	}

	mapRechazos(ventas: { cantidad: number, ultimoEstado: Estados; }[]) {
		const rechazos = ventas.filter(v => v.ultimoEstado.toLowerCase().includes('rechazo'));
		const unaCombinatoria = new Combinatoria(
			{ data: this.estadosRechazo, nombre: 'ultimoEstado' },
			{ data: [0], nombre: 'cantidad' }
		);
		const rechazosAgrupados = this.agruparEstadosPorUltimoEstadoRechazoBy(['ultimoEstado'])(rechazos);
		unaCombinatoria.mergeBy(['ultimoEstado'], rechazosAgrupados);
		const rechazosFinales = unaCombinatoria.combinatoria;
		const colorPalette = new ColorPalette(rechazosFinales.length);
		const colores = rechazosFinales.map(() => colorPalette.proximoColor());
		const labels = rechazosFinales.map(r => r.ultimoEstado);
		const datasets = {
			label: 'cantidad',
			data: rechazosFinales.map(d => d.cantidad),
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

	/* POR ESTADO POR VENDEDORA */
	traerVentasPorEstadoPorVendedora({ fechaDesde, fechaHasta }): Observable<{ labels: any[], datasets: any[]; }> {
		const params = this.defaultHttpParamsGroupByUltimoEstado(fechaDesde, fechaHasta).append('groupBy[]', 'usuario');
		console.log('params', params.toString());
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
		const estados = this.dashboard === 'supervisoraCall' ? this.estados : [Estados.CREADO];
		const datasetsLabels = estados;
		const usuarios = vendedoras.map(v => v.nombre); // sin repetidos
		const ventasConRechazosAgrupados = this.agruparEstadosPorUltimoEstadoRechazoBy(['ultimoEstado', 'usuario'])(ventas);
		const unaCombinatoria = new Combinatoria(
			{ data: usuarios, nombre: 'usuario' },
			{ data: estados, nombre: 'ultimoEstado' },
			{ data: [0], nombre: 'cantidad' }
		);
		unaCombinatoria.mergeBy(['ultimoEstado', 'usuario'], ventasConRechazosAgrupados);
		const ventasFinales = unaCombinatoria.combinatoria;
		const usuariosOrdenadosPorCantidad = usuarios.sort((usuario, otroUsuario) => {
			const cantidadUsuario = ventasFinales
				.filter(v => v.usuario === usuario)
				.reduce((acum, v) => acum + v.cantidad, 0);
			const cantidadOtroUsuario = ventasFinales
				.filter(v => v.usuario === otroUsuario)
				.reduce((acum, v) => acum + v.cantidad, 0);
			return cantidadUsuario < cantidadOtroUsuario ? 1 : -1;
		});
		const colorPalette = new ColorPalette(datasetsLabels.length);
		const datasets = datasetsLabels.map(label => {
			const color = colorPalette.proximoColor();
			return {
				label,
				data: usuariosOrdenadosPorCantidad.map(u => ventasFinales.find(d => d.usuario === u && d.ultimoEstado === label)).map(d => d.cantidad),
				backgroundColor: color,
				borderColor: color
			};
		});
		return { labels: usuariosOrdenadosPorCantidad, datasets };
	}

	/* HELPERS */
	combinarEstadosRepetidosSumandoCantidad = (identificadores: string[]) => (array, valorActual) => {
		const esElMismoElemento = e => identificadores.every(id => e[id] === valorActual[id]);
		const index = array.findIndex(esElMismoElemento);
		if (index !== -1) {
			array[index].cantidad += valorActual.cantidad;
		} else {
			array.push(valorActual);
		}
		return array;
	};

	completarUltimaSemana(dias: { cantidad: number, fecha: string; }[]) {
		const labels = this.diasUltimaSemana();
		const unaCombinatoria = new Combinatoria(
			{ data: this.diasUltimaSemana(), nombre: 'fecha' },
			{ data: [0], nombre: 'cantidad' }
		);
		unaCombinatoria.mergeBy(['fecha'], dias);
		const diasFinal = unaCombinatoria.combinatoria;
		const color = new ColorPalette(1).proximoColor();
		return { labels, datasets: [{ label: 'cantidad', data: diasFinal, backgroundColor: color, borderColor: color }] };
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
			fechaDesde: moment().add(-1, 'years').format('YYYY-MM-DD'),
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
