import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPersonaComponent } from './buscador-persona.component';

describe('BuscadorPersonaComponent', () => {
  let component: BuscadorPersonaComponent;
  let fixture: ComponentFixture<BuscadorPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
