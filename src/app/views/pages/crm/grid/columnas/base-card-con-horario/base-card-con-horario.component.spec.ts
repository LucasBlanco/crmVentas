import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCardConHorarioComponent } from './base-card-con-horario.component';

describe('BaseCardConHorarioComponent', () => {
  let component: BaseCardConHorarioComponent;
  let fixture: ComponentFixture<BaseCardConHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseCardConHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCardConHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
