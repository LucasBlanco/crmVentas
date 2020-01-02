import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import * as moment from 'moment';
import {interval} from 'rxjs'
import {ActividadSesionService} from "@servicios/actividad-sesion.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AfkService {

	ultimoEvento = moment()
	checkTimeObservable = interval(5000);

  constructor(private actividadSesionSrv: ActividadSesionService, private router: Router) {
  	this.checkTimeObservable.subscribe(() => {
  		if(this.estoyEnPantallaLogin()){ return }
  		const haceCuantoFueElUltimoEvento = this.ultimoEvento.diff(moment(), 'minutes')
		console.log(haceCuantoFueElUltimoEvento)
  		if(Math.abs(haceCuantoFueElUltimoEvento) > 15){
			actividadSesionSrv.logout()
		}
	})
  }

	estoyEnPantallaLogin(){
		return this.router.url === '/auth/login'
	}

  subscribeToMouseMove(observable: Observable<any>) {
    observable.pipe(auditTime(1000)).subscribe(() => {
    	this.ultimoEvento = moment()
	})
  }


}
