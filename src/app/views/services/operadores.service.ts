import { Injectable } from '@angular/core';
import { Operador } from '@modelos/operador';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperadoresService {

  operadores: Operador[];
  constructor() {
    /*const operador1: Operador = getFakeOperador();
    const operador2: Operador = getFakeOperador();
    this.operadores = [operador1, operador2];*/
  }

  traerTodos() {
    return new BehaviorSubject(this.operadores);
  }
}
