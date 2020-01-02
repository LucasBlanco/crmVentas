import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorCallComponent } from './vendedor-call.component';

describe('VendedorCallComponent', () => {
  let component: VendedorCallComponent;
  let fixture: ComponentFixture<VendedorCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VendedorCallComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
