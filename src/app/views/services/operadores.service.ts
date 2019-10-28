import { Injectable } from '@angular/core';
import { Operador } from '@modelos/operador';
import { of } from 'rxjs';

import { getFakeOperador } from './../models/operador';

@Injectable({
  providedIn: 'root'
})
export class OperadoresService {

  operadores: Operador[];
  constructor() {
    const operador1: Operador = getFakeOperador();
    const operador2: Operador = { ...getFakeOperador(), nombre: 'otroOperador', id: 2 };
    this.operadores = [operador1, operador2];
  }

  traerTodos() {
    return of(this.operadores);
  }
}
