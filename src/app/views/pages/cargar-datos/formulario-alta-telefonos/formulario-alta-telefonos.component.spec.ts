import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAltaTelefonosComponent } from './formulario-alta-telefonos.component';

describe('FormularioAltaTelefonosComponent', () => {
  let component: FormularioAltaTelefonosComponent;
  let fixture: ComponentFixture<FormularioAltaTelefonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAltaTelefonosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAltaTelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
