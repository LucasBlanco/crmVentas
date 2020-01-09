import { Injectable } from '@angular/core';
import {OperadoresService} from "@servicios/operadores.service";
import {Agendado} from "@modelos/agendado";

@Injectable({
  providedIn: 'root'
})
export class AgendadoService {

  constructor(private operadorSrv: OperadoresService) { }

  mapToFront(agendado){
  		let operador = this.operadorSrv.mapToFront(agendado.usuario)
	  return new Agendado({nota: agendado.nota, fecha: agendado.fecha, id:agendado.id, rellamado: agendado.rellamado, usuario:operador})
  }
}
