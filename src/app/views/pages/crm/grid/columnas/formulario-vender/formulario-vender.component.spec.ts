import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVenderComponent } from './formulario-vender.component';

describe('FormularioVenderComponent', () => {
  let component: FormularioVenderComponent;
  let fixture: ComponentFixture<FormularioVenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioVenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
