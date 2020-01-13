import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';

export interface AnswerConfig {
  id: number;
  fecha: string;
  nombre: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  distribuciones: [
    {
      id: number;
      porcentaje: number;
      id_base: string;
      id_configuracion: string;
      created_at: string;
      updated_at: string;
      base: [
        {
          id: number;
          nombre: string;
          proveedor: string;
          created_at: string;
          updated_at: string;
          tipo: string;
        }
      ]
    }
  ];
}

export interface AnswerBases {
  id: number;
  proveedor: string;
  nombre: string;
  created_at: string;
  updated_at: string;
  tipo: string;
}

export interface Config {
  nombre: string;
  id: number;
  id_front: number;
  selected: boolean;
  values: number[];
}

export interface Database {
  nombre: string;
  id: number;
  id_front: number;
  proveedor: string;
}


@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  public listaConfigs: Config[] = [];
  public listaDatabases: Database[] = [];
  constructor(private http: HttpClient) { }

  traerBases() {
    this.listaDatabases = [];
    const userToken = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Authorization', 'Bearer ' + userToken);
    httpHeaders.set('Content-Type', 'application/json');
    this.http.get<AnswerBases[]>('http://ventas.test/bases?tipo=interna', { headers: httpHeaders }).subscribe(
      (val) => {
        val.forEach((value, i) => {
          this.listaDatabases[i] = {
            nombre: value.nombre,
            id: value.id,
            proveedor: value.proveedor,
            id_front: i
          };
        });
        this.traerConfiguraciones();
      });
  }

  traerConfiguraciones() {
    this.listaConfigs = [];
    const userToken = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Authorization', 'Bearer ' + userToken);
    httpHeaders.set('Content-Type', 'application/json');
    this.http.get<AnswerConfig[]>('http://ventas.test/configuracionesDistribucionBases/{id}', { headers: httpHeaders }).subscribe(
      (val) => {
        val.forEach((value, i) => {
          this.listaConfigs[i] = {
            id: value.id,
            id_front: i,
            nombre: value.nombre,
            selected: false,
            values: value.distribuciones.map(x => x.porcentaje)
          };
          let prevLength = this.listaConfigs[i].values.length;
          this.listaConfigs[i].values.length = this.listaDatabases.length;
          this.listaConfigs[i].values.fill(0, prevLength);
        });
      });
  }

  crearConfiguracion(id_front, nombre, percentages) {
    const userToken = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Authorization', 'Bearer ' + userToken);

    let dataCrear = {
      nombre: nombre,
      distribuciones: []
    };

    for (let i = 0; i < this.listaDatabases.length; i++) {
      dataCrear.distribuciones[i] = {
        id_base: this.listaDatabases[i].id,
        porcentaje: percentages[i]
      };
    }

    this.http.post<any>('http://ventas.test/configuracionesDistribucionBases', dataCrear,
      { headers: httpHeaders }).subscribe((val) => {
        this.listaConfigs.push({
          nombre: nombre,
          id: val.id,
          id_front: id_front,
          selected: false,
          values: percentages
        });
      });
  }


  borrarConfiguracion(id_front, index) {
    const userToken = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Authorization', 'Bearer ' + userToken);

    this.http.delete<any>('http://ventas.test/configuracionesDistribucionBases/' + this.listaConfigs[id_front].id,
      { headers: httpHeaders }).subscribe(() => {
        this.listaConfigs.splice(index, 1);
        for (let i = 0; i < this.listaConfigs.length; i++) {
          this.listaConfigs[i].id_front = i;
        }
      });
  }

  editarConfiguracion(id_front, nombre, percentages) {
    const userToken = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Authorization', 'Bearer ' + userToken);

    let dataEdit = {
      nombre: this.listaConfigs[id_front].nombre,
      distribuciones: []
    }

    for (let i = 0; i < this.listaDatabases.length; i++) {
      dataEdit.distribuciones[i] = {
        id_base: this.listaDatabases[i].id,
        porcentaje: percentages[i]
      };
    }
    this.http.put<any>('http://ventas.test/configuracionesDistribucionBases/' + this.listaConfigs[id_front].id,
      dataEdit, { headers: httpHeaders }).subscribe(() => {
        this.listaConfigs[id_front].nombre = nombre;
        this.listaConfigs[id_front].values = percentages;
      });
  }

}


