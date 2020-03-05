import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorVentaComponent } from './buscador-venta.component';

describe('BuscadorVentaComponent', () => {
  let component: BuscadorVentaComponent;
  let fixture: ComponentFixture<BuscadorVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
