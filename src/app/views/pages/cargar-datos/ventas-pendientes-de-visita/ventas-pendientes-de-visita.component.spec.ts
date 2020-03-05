import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasPendientesDeVisitaComponent } from './ventas-pendientes-de-visita.component';

describe('VentasPendientesDeVisitaComponent', () => {
  let component: VentasPendientesDeVisitaComponent;
  let fixture: ComponentFixture<VentasPendientesDeVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasPendientesDeVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasPendientesDeVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
