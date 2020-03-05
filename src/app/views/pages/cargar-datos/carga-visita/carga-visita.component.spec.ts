import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaVisitaComponent } from './carga-visita.component';

describe('CargaVisitaComponent', () => {
  let component: CargaVisitaComponent;
  let fixture: ComponentFixture<CargaVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
