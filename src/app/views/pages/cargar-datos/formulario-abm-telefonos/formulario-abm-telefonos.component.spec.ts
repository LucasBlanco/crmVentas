import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTelefonosComponent } from './formulario-abm-telefonos.component';

describe('AltaTelefonosComponent', () => {
  let component: AltaTelefonosComponent;
  let fixture: ComponentFixture<AltaTelefonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaTelefonosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
