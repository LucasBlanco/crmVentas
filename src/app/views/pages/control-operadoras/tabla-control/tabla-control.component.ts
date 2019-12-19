import { Component, OnInit } from '@angular/core';
import {OperadoresService} from "@servicios/operadores.service";
import Pusher from 'pusher-js';
import {ActividadSesion} from "@modelos/actividadSesion";


const data = [
	{"nombre": "joaquin mazoud", "estado": "Break", "ultimaActividad": "hace 30 minutos"},
	{"nombre": "joaquin mazoud", "estado": "Break", "ultimaActividad": "hace 30 minutos"},
	{"nombre": "joaquin mazoud", "estado": "Break", "ultimaActividad": "hace 30 minutos"},
	{"nombre": "joaquin mazoud", "estado": "Break", "ultimaActividad": "hace 30 minutos"}
]

@Component({
  selector: 'crm-tabla-control',
  templateUrl: './tabla-control.component.html',
  styleUrls: ['./tabla-control.component.scss']
})
export class TablaControlComponent implements OnInit {
	dataSource = []
  constructor(private operadorSrv: OperadoresService) { }

  ngOnInit() {
	  var pusher = new Pusher('e7b3f11c95045ebe9b9c', {
		  cluster: 'us2'
	  });
	  var channel = pusher.subscribe('supervisorcall');

	  channel.bind('usuario.conectado', (data) => {
		  let index = m.get(data.id)
		  this.dataSource[index].estado = "Conectado";
	  });
	  channel.bind('usuario.desconectado', (data) => {
		  let index = m.get(data.id)
		  this.dataSource[index].estado = "Desconectado";
	  });
	  channel.bind('usuario.enbreak', (data) => {
		  let index = m.get(data.id)
		  this.dataSource[index].estado = "Break";
	  });
	  let m = new Map()
	  this.operadorSrv.traerTodos().subscribe(operadores => {
	  	this.dataSource = operadores.map(x => ({
			id: x.id,
			nombre: x.nombre,
			estado: x.actividadReciente.length > 0 ? this.getActividad(x.actividadReciente) : 'Sin actividad',
			ultimaActividad: x.actividadReciente.length > 0 ? x.actividadReciente[0].fecha : ''}))
		  this.dataSource.forEach((elemento,k) => m.set(elemento.id, k))
		  console.log(m)

	  })

  }

  getActividad(actividadesRecientes: ActividadSesion[]){
		switch (actividadesRecientes[0].actividad) {
			case "Inicio sesion":
				return "Conectado"
			case "Cerrar sesion":
				return "Desconectado"
			case "Inicio break":
				return "Break"
			case "Fin break":
				return "Conectado"
		}
  }

  determinarChipEstado(estado){
		switch (estado) {
			case "Conectado":
				return "estadoConectado"
			case "Desconectado":
				return "estadoDesconectado"
			case "Break":
				return "estadoBreak"
		}
  }

}
