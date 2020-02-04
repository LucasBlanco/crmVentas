import { TestBed } from '@angular/core/testing';
import { ContactoConHorario, getFakeContacto, ISeguimiento, Seguimiento } from '@modelos/contacto';
import { Columnas } from '@servicios/crm.service';
import { BehaviorSubject } from 'rxjs';

import { getFakeContactoConHorario, IContactoConHorario } from './../models/contacto';
import { CrmService } from './crm.service';

describe('CrmService', () => {
  let service: CrmService;
  let contacto1: ISeguimiento;
  let contacto2: IContactoConHorario;
  let contacto3: IContactoConHorario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CrmService);
    contacto1 = getFakeContacto();
    contacto2 = {
      ...getFakeContactoConHorario(),
      nombre: 'Carlos2',
      id: 2
    };
    contacto3 = {
      ...getFakeContactoConHorario(),
      nombre: 'Carlos3',
      id: 3
    };
    service.contactosALlamar$ = new BehaviorSubject([new Seguimiento(contacto1)]);
    service.contactosAgendados$ = new BehaviorSubject([new ContactoConHorario(contacto2)]);
    service.contactosARellamar$ = new BehaviorSubject([new ContactoConHorario(contacto3)]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia mover un contacto de a llamar a agendado correctamente', () => {
    service.moverContacto(Columnas.ALLAMAR, Columnas.AGENDADO, contacto1);
    expect(service.getContactosALlamar().value.length).toEqual(0);
    expect(
      service.getContactosAgendados().value.length === 2 &&
      service.getContactosAgendados().value.some(c => c.id === contacto1.id) &&
      service.getContactosAgendados().value.some(c => c.id === contacto2.id)
    ).toBeTruthy();
  });

});
