import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { ModalAgendadoComponent } from './modal-agendado.component';

describe('ModalAgendadoComponent', () => {
  let component: ModalAgendadoComponent;
  let fixture: ComponentFixture<ModalAgendadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAgendadoComponent],
      imports: [MatMenuModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgendadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
