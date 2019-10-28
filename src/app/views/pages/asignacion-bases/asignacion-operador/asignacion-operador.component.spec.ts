import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionOperadorComponent } from './asignacion-operador.component';

describe('AsignacionOperadorComponent', () => {
  let component: AsignacionOperadorComponent;
  let fixture: ComponentFixture<AsignacionOperadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionOperadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
