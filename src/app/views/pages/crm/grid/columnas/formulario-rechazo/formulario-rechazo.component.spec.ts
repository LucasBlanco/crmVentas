import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRechazoComponent } from './formulario-rechazo.component';

describe('FormularioRechazoComponent', () => {
  let component: FormularioRechazoComponent;
  let fixture: ComponentFixture<FormularioRechazoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioRechazoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRechazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
