export interface IPersona {
    nombre: string;
    apellido: string;
    telefonos: {
        numero: string,
        horarioContacto: string
    }[];
    id: number;
    dni: number;
    cuil: number;
    nacionalidad: string;
    estadoCivil: 'CASADO' | 'SOLTERO' | 'CONCUVINATO';
    fechaNacimiento: string;
    capitas: number;
}

export class Persona implements IPersona {
    nombre: string;
    apellido: string;
    telefonos: {
        numero: string,
        horarioContacto: string
    }[];
    id: number;
    dni: number;
    cuil: number;
    nacionalidad: string;
    estadoCivil: 'CASADO' | 'SOLTERO' | 'CONCUVINATO';
    fechaNacimiento: string;
    capitas: number;
    constructor(persona: IPersona) {
        this.nombre = persona.nombre;
        this.apellido = persona.apellido;
        this.telefonos = persona.telefonos;
        this.id = persona.id;
        this.dni = persona.dni;
        this.cuil = persona.cuil;
        this.nacionalidad = persona.nacionalidad;
        this.estadoCivil = persona.estadoCivil;
        this.fechaNacimiento = persona.fechaNacimiento;
        this.capitas = persona.capitas;
    }
}

export const getFakePersona = () => {
    return new Persona({
        nombre: 'Carlos',
        apellido: 'Mazoud',
        telefonos: [
            { numero: '15-2399-6532', horarioContacto: 'de 11 a 12' },
            { numero: '15-2399-6532', horarioContacto: 'de 11 a 12' }
        ],
        id: 1,
        dni: 39268594,
        cuil: 20392685945,
        nacionalidad: 'Argentina',
        estadoCivil: 'CASADO',
        fechaNacimiento: '1995-10-17',
        capitas: 3
    });
};