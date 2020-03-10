import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorCallComponent } from './supervisor-call.component';

describe('SupervisorCallComponent', () => {
  let component: SupervisorCallComponent;
  let fixture: ComponentFixture<SupervisorCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
