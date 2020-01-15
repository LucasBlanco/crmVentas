import {Domicilio, getFakeDomicilio} from './domicilio';


export interface IPersona {
	nombre: string;
	apellido: string;
	telefonos: {
		numero: string,
		horarioContacto: { desde: string, hasta: string },
	}[];
	id: number;
	dni: number;
	cuil: number;
	nacionalidad: string;
	domicilio?: Domicilio;
	estadoCivil: 'CASADO' | 'SOLTERO' | 'CONCUVINATO';
	fechaNacimiento: string;
	sexo: 'M' | 'F';
	capitas: number;
}

export class Persona implements IPersona {
	nombre: string;
	apellido: string;
	telefonos: {
		numero: string,
		horarioContacto: { desde: string, hasta: string },
	}[];
	id: number;
	dni: number;
	cuil: number;
	domicilio?: Domicilio;
	sexo: 'M' | 'F';
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
		this.sexo = persona.sexo;
		this.domicilio = persona.domicilio;
	}


}

export const getFakePersona = () => {
	const faker = require('faker/locale/es');
	return new Persona({
		nombre: faker.name.firstName(),
		apellido: faker.name.lastName(),
		telefonos: [
			{numero: faker.phone.phoneNumber(), horarioContacto: {desde:'11:00', hasta:'12:00'}}
		],
		domicilio: getFakeDomicilio(),
		id: faker.random.number(),
		dni: faker.random.number(99999999),
		cuil: faker.random.number(99999999999),
		nacionalidad: faker.address.country(),
		estadoCivil: 'CASADO',
		fechaNacimiento: faker.date.past().toDateString(),
		capitas: faker.random.number(10),
		sexo: 'M'
	});
};
