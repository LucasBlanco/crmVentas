import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatMenuModule } from '@angular/material';

import { BaseCardComponent } from '../base-card/base-card.component';
import { CardALlamarComponent } from './card-a-llamar/card-a-llamar.component';
import { ColumnaALlamarComponent } from './columna-a-llamar.component';
import { ModalALlamarComponent } from './modal-a-llamar/modal-a-llamar.component';

describe('ALlamarComponent', () => {
  let component: ColumnaALlamarComponent;
  let fixture: ComponentFixture<ColumnaALlamarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnaALlamarComponent, CardALlamarComponent, ModalALlamarComponent, BaseCardComponent],
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        MatMenuModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnaALlamarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
