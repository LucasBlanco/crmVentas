import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatMenuModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { getFakeContactoConHorario } from '@modelos/contacto';
import { CrmService } from '@servicios/crm.service';
import { BehaviorSubject } from 'rxjs';

import { BaseCardConHorarioComponent } from '../base-card-con-horario/base-card-con-horario.component';
import { BaseCardComponent } from '../base-card/base-card.component';
import { CardRellamarComponent } from './card-rellamar/card-rellamar.component';
import { ColumnaRellamarComponent } from './columna-rellamar.component';
import { ModalRellamarComponent } from './modal-rellamar/modal-rellamar.component';


describe('ColumnaRellamarComponent', () => {
  let component: ColumnaRellamarComponent;
  let fixture: ComponentFixture<ColumnaRellamarComponent>;
  const contactos = [getFakeContactoConHorario(), { ...getFakeContactoConHorario(), id: 2 }];
  let crmServiceSpy: jasmine.SpyObj<CrmService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CrmService', ['getContactosARellamar']);
    TestBed.configureTestingModule({
      declarations: [
        ColumnaRellamarComponent,
        CardRellamarComponent,
        ModalRellamarComponent,
        BaseCardComponent,
        BaseCardConHorarioComponent
      ],
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        MatMenuModule
      ],
      providers: [
        { provide: CrmService, useValue: spy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnaRellamarComponent);
    component = fixture.componentInstance;
    crmServiceSpy = TestBed.get(CrmService);
    crmServiceSpy.getContactosARellamar.and.returnValue(new BehaviorSubject(contactos));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia tener 2 contactos', () => {
    const contactosCard = fixture.debugElement.queryAll(By.css('crm-card-rellamar'));
    expect(contactosCard.length).toEqual(2);
  });
});
