
export interface IUsuario {
    obrasSociales: { nombre: string, id: number }[];
    permisos: string[];
    perfiles: string[];
    nombre: string;
    id: number;
}

export class Usuario implements IUsuario {
    obrasSociales: { nombre: string, id: number }[];
    permisos: string[];
    perfiles: string[];
    nombre: string;
    id: number;
    constructor(usuario: IUsuario) {
        this.obrasSociales = (usuario as any).obraSociales;
        this.permisos = usuario.permisos;
        this.perfiles = usuario.perfiles;
        this.nombre = usuario.nombre;
        this.id = usuario.id;
    }
}
