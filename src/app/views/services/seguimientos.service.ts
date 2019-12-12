import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeguimientosService {

  constructor(private http: HttpClient) { }

  crear(seguimiento){
  	console.log('oda2')
  	this.http.post(environment.ip+'/ventas?XDEBUG_SESSION_START=PHPSTORM', seguimiento).subscribe(p => console.log(p))
  }
}
