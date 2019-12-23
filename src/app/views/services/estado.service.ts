import { Injectable } from '@angular/core';
import {OperadoresService} from "@servicios/operadores.service";
import {Estado} from "@modelos/estado";

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private operadorSrv: OperadoresService) { }

  mapToFront(estado){
  	let operador = this.operadorSrv.mapToFront(estado.usuario)
  	return new Estado({estado: estado.estado, observacion:estado.observacion, fecha:estado.fecha, id:estado.id, usuario:operador})
  }
}
