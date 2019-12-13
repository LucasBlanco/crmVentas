import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgendarComponent } from './formulario-agendar.component';

describe('FormularioAgendarComponent', () => {
  let component: FormularioAgendarComponent;
  let fixture: ComponentFixture<FormularioAgendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAgendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAgendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
