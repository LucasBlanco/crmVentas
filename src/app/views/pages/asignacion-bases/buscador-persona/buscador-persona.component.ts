import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OperadoresService} from "@servicios/operadores.service";
import {Operador} from "@modelos/operador";
import {Fuente} from "@modelos/fuente";
import {FuentesService} from "@servicios/fuentes.service";
import {SeguimientosService} from "@servicios/seguimientos.service";

@Component({
  selector: 'crm-buscador-persona',
  templateUrl: './buscador-persona.component.html',
  styleUrls: ['./buscador-persona.component.scss']
})
export class BuscadorPersonaComponent implements OnInit {

	form = new FormGroup({
		operadores: new FormControl(null, Validators.required),
		cuil: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
	})
	operadores: Operador[] = []
  constructor(private operadorSrv: OperadoresService, private seguimientosSrv: SeguimientosService) { }

  ngOnInit() {
		this.operadorSrv.traerTodos().subscribe(operadores => this.operadores = operadores)
  }

  asignar() {
		console.log('oda')
		let usuario = this.form.get('operadores').value
		let cuil = this.form.get('cuil').value
		this.seguimientosSrv.crear({id_usuario: usuario, cuil:cuil})
  }

}
