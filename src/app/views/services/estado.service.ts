import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperadoresService } from "@servicios/operadores.service";
import { Estado } from "@modelos/estado";
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  rechazosEnLlamado$ = new ReplaySubject<string[]>();
  firstLoad = true;
  constructor(private operadorSrv: OperadoresService, private http: HttpClient) { }

  mapToFront(estado) {
    const operador = this.operadorSrv.mapToFront(estado.usuario);
    return new Estado({ estado: estado.estado, observacion: estado.observacion, fecha: estado.fecha, id: estado.id, usuario: operador });
  }

  getAll() {
    return this.http.get<any[]>(`${environment.ip}/estadistica/estados`).pipe(
      map(data => data.map(({ estado }) => estado))
    );
  }

  rechazosEnLlamado() {
    if (this.firstLoad) {
      this.http.get<string[]>((`${environment.ip}/estados/rechazosEnLlamado`)).subscribe(
        rechazos => this.rechazosEnLlamado$.next(rechazos)
      );
      this.firstLoad = false;
    }
    return this.rechazosEnLlamado$;
  }
}
