import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { flow } from 'lodash/fp';
import { map } from 'rxjs/operators';

import { generarArrayColores } from './helpers/color-palette';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasBaseService {

  constructor(private http: HttpClient) { }

  private groupBy = (campo) => (params) => params.append('groupBy[]', campo);
  private filter = (campo, valor) => (params) => params.append(`filters[${campo}][]`, valor);


  traerVentasPorBase(idBase: number) {
    const attachParams = flow([
      this.groupBy('grupoDeEstados'),
      this.filter('bases', [idBase])
    ]);
    const params = attachParams(new HttpParams());
    return this.http.get<{ grupoDeEstados: string, cantidad: number; }[]>(`${environment.ip}/estadistica/cantidadVentas`, { params })
      .pipe(
        map(cantidades => ({
          labels: cantidades.map(c => c.grupoDeEstados),
          datasets: [{
            label: 'cantidad',
            data: cantidades.map(c => c.cantidad),
            backgroundColor: generarArrayColores(cantidades.length)
          }]
        })
        )
      );
  }

  traerVentasIncontactables(idBase) {
    return this.traerVentasPorGrupoEstados(idBase, 'Incontactables');
  }
  traerVentasVendidos(idBase) {
    return this.traerVentasPorGrupoEstados(idBase, 'Vendidos');
  }
  traerVentasVendibles(idBase) {
    return this.traerVentasPorGrupoEstados(idBase, 'Vendibles');
  }
  traerVentasInvendibles(idBase) {
    return this.traerVentasPorGrupoEstados(idBase, 'Invendibles');
  }

  traerVentasPorGrupoEstados(idBase, grupoEstado) {
    const attachParams = flow([
      this.filter('grupoDeEstados', [grupoEstado]),
      this.groupBy('estado')
    ]);
    const params = attachParams(new HttpParams());
    return this.http.get<{ estados: string, cantidad: number; }[]>(`${environment.ip}/estadistica/cantidadVentas`, { params })
      .pipe(
        map(this.mapCantidades)
      );
  }

  mapCantidades(cantidades) {
    return {
      labels: cantidades.map(c => c.estado),
      datasets: [{
        label: 'cantidad',
        data: cantidades.map(c => c.cantidad),
        backgroundColor: generarArrayColores(cantidades.length)
      }]
    };
  }



}
