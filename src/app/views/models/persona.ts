

export interface IPersona {
    nombre: string;
    apellido: string;
    telefonos: {
        nombre: 'telefono' | 'celular',
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
        nombre: 'telefono' | 'celular',
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
    const faker = require('faker/locale/es');
    return new Persona({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        telefonos: [
            { nombre: 'telefono', numero: faker.phone.phoneNumber(), horarioContacto: 'de 11 a 12' },
            { nombre: 'celular', numero: faker.phone.phoneNumber(), horarioContacto: 'de 11 a 12' }
        ],
        id: faker.random.number(),
        dni: faker.random.number(99999999),
        cuil: faker.random.number(99999999999),
        nacionalidad: faker.address.country(),
        estadoCivil: 'CASADO',
        fechaNacimiento: faker.date.past().toDateString(),
        capitas: faker.random.number(10)
    });
};