export interface IBase {
    id: number;
    nombre: string;
    proveedor: string;
    tipo: string;
}

export class Base implements IBase {
    id: number;
    nombre: string;
    proveedor: string;
    tipo: string;
    constructor(fuente: IBase) {
        this.id = fuente.id;
        this.nombre = fuente.nombre;
        this.proveedor = fuente.proveedor;
        this.tipo = fuente.tipo;
    }
}


