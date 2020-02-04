import { Persona } from './persona';

export interface Venta extends Omit<Persona, 'telefonos'> {
    idObraSocial: number;
}
