import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisiticasBaseComponent } from './estadisiticas-base.component';

describe('EstadisiticasBaseComponent', () => {
  let component: EstadisiticasBaseComponent;
  let fixture: ComponentFixture<EstadisiticasBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisiticasBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisiticasBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
