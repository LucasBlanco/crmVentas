import { IDomicilio } from '@modelos/domicilio';

export interface IDomicilioVisita extends Omit<IDomicilio & { lugar, entreCalles; }, 'codigoPostal' | 'codigoPostalNuevo'> { }

export class DomicilioVisita implements IDomicilioVisita {
    calle: string;
    departamento: string;
    numero: number;
    piso: string;
    lugar: string;
    idLocalidad: number;
    entreCalles: string;
    constructor(domicilio: IDomicilioVisita) {
        this.calle = domicilio.calle;
        this.departamento = domicilio.departamento;
        this.numero = domicilio.numero;
        this.piso = domicilio.piso;
        this.idLocalidad = domicilio.idLocalidad;
        this.lugar = domicilio.lugar;
        this.entreCalles = domicilio.entreCalles;
    }
}


export interface IVisita {
    idVenta?: number;
    id?: number;
    observacion: number;
    fecha: string;
    horaDesde: string;
    horaHasta: string;
    domicilio: DomicilioVisita;
}


export class Visita implements IVisita {
    idVenta?: number;
    id?: number;
    observacion: number;
    fecha: string;
    horaDesde: string;
    horaHasta: string;
    domicilio: DomicilioVisita;
    constructor(visita: Visita) {
        this.idVenta = visita.idVenta;
        this.id = visita.id;
        this.observacion = visita.observacion;
        this.fecha = visita.fecha;
        this.horaDesde = visita.horaDesde;
        this.horaHasta = visita.horaHasta;
        this.domicilio = visita.domicilio;
    }
}