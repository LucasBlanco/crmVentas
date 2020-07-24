import { map } from 'rxjs/operators';
import { AgendadosPorChica } from './../models/agendados';
import { ResultadoBase } from './../models/resultadoBase';

import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EstadisticaUnNivel {
  label: string;
  value: number;
}

export interface EstadisticaDosNiveles {
  label: string;
  value: EstadisticaUnNivel[];
}

@Injectable({
  providedIn: 'root'
})
export class EstadisticaApiService {

  constructor(private http: HttpClient) { }

  gestionadosPorPersona() {
    return this.http.get<EstadisticaUnNivel[]>(`${environment.ip}/estadistica/promedioDatosVendedora`);
  }

  netasYBrutas() {
    return this.http.get<EstadisticaDosNiveles[]>(`${environment.ip}/estadistica/cantidadVentasBrutasYNetas`);
  }


  cantVentasPorMes() {
    return this.http.get<EstadisticaDosNiveles[]>(`${environment.ip}/estadistica/cantidadVentasPorMes`);
  }

  resultadosBase(): Observable<ResultadoBase[]> {
    return this.http.get<any[]>(`${environment.ip}/estadistica/resultadoBases`).pipe(
      map(data => data.map(d => ({
        cantidad: d.cantidad,
        contactadas: d.contactadas,
        id: d.id,
        invendibles: d.invendibles,
        llamadas: d.llamadas,
        nombre: d.nombre,
        porcentajeContactadas: d.porcentajeContactadas,
        porcentajeInvendibles: d.porcentajeInvendibles,
        porcentajeVendibles: d.porcentajeVendibles,
        porcentajeVendidas: d.porcentajeVendidas,
        vendibles: d.vendibles,
        vendidas: d.vendidas
      }))
      )
    );
  }

  agendados(): Observable<AgendadosPorChica> {
    return this.http.get<any>(`${environment.ip}/estadistica/cantidadAgendadosHoy`).pipe(
      map(data => ({
        total: data.total,
        data: data.porChica.map(c => ({ nombre: c.nombre, cantidad: c.cantidad }))
      }))
    );
  }



  ventasPorPersona(rango: 'hoy' | 'ultimoDia' | 'ultimaSemana' | 'ultimoMes') {
    switch (rango) {
      case 'hoy':
        return this.http.get<EstadisticaDosNiveles[]>(`${environment.ip}/estadistica/cantidadVentasPorChicaHoy`);

      case 'ultimoDia':
        return this.http.get<EstadisticaDosNiveles[]>(`${environment.ip}/estadistica/cantidadVentasPorChicaUltimoDiaHabil`);

      case 'ultimaSemana':
        return this.http.get<EstadisticaDosNiveles[]>(`${environment.ip}/estadistica/cantidadVentasPorChicaUltimos7Dias`);

      case 'ultimoMes':
        return this.http.get<EstadisticaDosNiveles[]>(`${environment.ip}/estadistica/cantidadVentasPorChicaUltimoMes`);

    }
  }

}
