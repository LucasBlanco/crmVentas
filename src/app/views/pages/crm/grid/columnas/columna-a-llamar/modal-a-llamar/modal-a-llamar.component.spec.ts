import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Columnas } from '@servicios/crm.service';

import { ModalALlamarComponent } from './modal-a-llamar.component';

describe('ModalALlamarComponent', () => {
  let component: ModalALlamarComponent;
  let fixture: ComponentFixture<ModalALlamarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalALlamarComponent],
      imports: [MatMenuModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalALlamarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia emitir el evento mover a llamar', () => {
    component.moverA.subscribe(columna => {
      expect(columna).toEqual(Columnas.ALLAMAR);
    });
    component.moverALlamar();
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
