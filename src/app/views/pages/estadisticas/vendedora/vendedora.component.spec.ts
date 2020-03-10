import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedoraComponent } from './vendedora.component';

describe('VendedoraComponent', () => {
  let component: VendedoraComponent;
  let fixture: ComponentFixture<VendedoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
