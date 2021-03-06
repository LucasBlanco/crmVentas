import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Columnas } from '@servicios/crm.service';

import { ModalRellamarComponent } from './modal-rellamar.component';

describe('ModalRellamarComponent', () => {
  let component: ModalRellamarComponent;
  let fixture: ComponentFixture<ModalRellamarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRellamarComponent],
      imports: [MatMenuModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRellamarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia emitir el evento mover a Agendado', () => {
    component.moverA.subscribe(columna => {
      expect(columna).toEqual(Columnas.AGENDADO);
    });
    component.moverAAgendado();
  });

  it('deberia emitir el evento mover a Rellamar', () => {
    component.moverA.subscribe(columna => {
      expect(columna).toEqual(Columnas.RELLAMAR);
    });
    component.moverAReLlamar();
  });
});
