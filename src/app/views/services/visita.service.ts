import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Visita } from '@modelos/visita';
import { UserService } from '@servicios/user.service';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  constructor(private http: HttpClient, private userSrv: UserService) { }

  crear(visita: Visita) {
    return this.http.post(`${environment.ip}/logisticaOper/generarVisita`, this.mapToBack(visita));
  }

  mapToBack(visita: Visita) {
    const domicilio = [];
    if (visita.domicilio.calle) { domicilio.push(`Calle: ${visita.domicilio.calle}`); }
    if (visita.domicilio.numero) { domicilio.push(`Numero: ${visita.domicilio.numero}`); }
    if (visita.domicilio.departamento) { domicilio.push(`Departamento: ${visita.domicilio.departamento}`); }
    if (visita.domicilio.piso) { domicilio.push(`Piso: ${visita.domicilio.piso}`); }
    return {
      idVenta: visita.idVenta,
      lugar: visita.domicilio.lugar,
      entreCalles: visita.domicilio.entreCalles,
      direccion: domicilio.join(', '),
      localidad: visita.domicilio.idLocalidad,
      observacion: visita.observacion,
      id_user: this.userSrv.getCurrentUser().id,
      fecha: visita.fecha,
      hora: `De ${visita.horaDesde} a ${visita.horaHasta}`
    };
  }

}
