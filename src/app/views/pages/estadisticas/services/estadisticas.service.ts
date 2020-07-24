import { EstadisticaApiService, EstadisticaUnNivel, EstadisticaDosNiveles } from './estadistica-api.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { toUpper } from 'lodash';
import { ColorPalette } from './color-pallete';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private estadisticaApi: EstadisticaApiService) { }

  gestionadosPorPersona() {
    return this.estadisticaApi.gestionadosPorPersona().pipe(
      map(data => ({ type: 'bar', data: this.toChartConfigFlat(data) }))
    );
  }

  netasYBrutas() {
    return this.estadisticaApi.netasYBrutas().pipe(map(data => ({ type: 'bar', data: this.toChartConfigGroup(data) })));
  }

  cantVentasPorMes() {
    return this.estadisticaApi.cantVentasPorMes().pipe(
      map(data => ({
        ...this.chartConfig({ type: 'bar', stacked: true }),
        data: this.toChartConfigGroup(data),
      })
      )
    );
  }

  resultadosBase() {
    return this.estadisticaApi.resultadosBase();
  }

  agendados() {
    return this.estadisticaApi.agendados();
  }

  ventasPorPersona(rango: 'hoy' | 'ultimoDia' | 'ultimaSemana' | 'ultimoMes') {
    return this.estadisticaApi.ventasPorPersona(rango).pipe(
      map(data => ({
        ...this.chartConfig({ type: 'horizontalBar', stacked: true }),
        data: this.toChartConfigGroup(data),
      })
      ));
  }

  chartConfig(options: { type: 'bar' | 'line' | 'horizontalBar', stacked?: boolean; }) {
    return {
      type: options.type,
      options: options.stacked ? { scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] } } : {}
    };
  }


  /*
 
  Input => [{label: '2020-07', value: 200},{label: '2020-08', value: 300}]
 
  Output => {labels: ['2020-07', '2020-08], datasets: [{ label: 'CANTIDAD', data: [200, 300], backgroundColor: [blue, blue]}]}
 
  */
  toChartConfigFlat(data: EstadisticaUnNivel[]) {
    return {
      labels: data.map(_data => _data.label),
      datasets: [{
        label: 'CANTIDAD',
        data: data.map(_data => _data.value),
        backgroundColor: data.map(() => 'rgba(54, 162, 235, 1)'),
      }]
    };
  }

  /*
 
  Input => [{
    label: '2020-07',
    value: [{ label: 'neto', value: 100}, { label: 'bruto', value: 200}]
  },{
    label: '2020-08',
    value: [{ label: 'neto', value: 300}, { label: 'bruto', value: 400}]
  }]
 
  Output => {
    labels: ['2020-07', '2020-08],
    datasets: [
      { label: 'NETO', data: [100, 300], backgroundColor: blue},
      { label: 'BRUTO', data: [200, 400], backgroundColor: red},
    ]}
 
  */

  toChartConfigGroup(data: EstadisticaDosNiveles[]) {
    const labels = data.map(d => d.label);
    const labels2Level = data[0].value.map(d => d.label);
    const colorPallete = new ColorPalette(labels2Level.length);
    return {
      labels: labels.map(toUpper),
      datasets: labels2Level.map(label => ({
        label: toUpper(label),
        backgroundColor: colorPallete.proximoColor(),
        data: data.map(d => d.value.find(d2 => d2.label === label).value)
      }))
    };
  }
}
