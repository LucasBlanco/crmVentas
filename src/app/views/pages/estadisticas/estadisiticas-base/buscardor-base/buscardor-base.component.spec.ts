import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscardorBaseComponent } from './buscardor-base.component';

describe('BuscardorBaseComponent', () => {
  let component: BuscardorBaseComponent;
  let fixture: ComponentFixture<BuscardorBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscardorBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscardorBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
