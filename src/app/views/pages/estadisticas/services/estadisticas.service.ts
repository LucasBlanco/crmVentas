import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { toUpper } from 'lodash';
import { ColorPalette } from './color-pallete';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor() { }

  gestionadosPorPersona() {
    return of([
      {
        label: '2020-07',
        value: 200
      },
      {
        label: '2020-07',
        value: 200
      },
      {
        label: '2020-07',
        value: 200
      },
      {
        label: '2020-07',
        value: 200
      },
      {
        label: '2020-07',
        value: 200
      }
    ]).pipe(map(this.toChartConfigFlat));
  }

  netasYBrutas() {
    return of([{
      label: '2020-07',
      value: [
        {
          label: 'neto',
          value: 200
        },
        {
          label: 'bruto',
          value: 200
        }
      ]
    },
    {
      label: '2020-07',
      value: [
        {
          label: 'neto',
          value: 200
        },
        {
          label: 'bruto',
          value: 200
        }
      ]
    }
    ]).pipe(map(this.toChartConfigGroup));
  }

  toChartConfigFlat(data: { label: string, value: number; }[]) {
    return {
      type: 'bar',
      data: {
        labels: data.map(data => data.label),
        datasets: [{
          label: 'CANTIDAD',
          data: data.map(data => data.value),
          backgroundColor: data.map(() => 'rgba(54, 162, 235, 1)'),
        }]
      }
    };
  }

  toChartConfigGroup(data: { label: string, value: { label: string, value: number; }[]; }[]) {
    const labels = data.map(d => d.label);
    const labels2Level = data[0].value.map(d => d.label);
    const colorPallete = new ColorPalette(labels2Level.length);
    return {
      type: 'bar',
      data: {
        labels: labels.map(toUpper),
        datasets: labels2Level.map(label => ({
          label: toUpper(label),
          backgroundColor: colorPallete.proximoColor(),
          data: data.map(d => d.value.find(d2 => d2.label === label).value)
        }))
      }
    };
  }
}
