import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AsignacionOperadorComponent } from './asignacion-operador.component';

describe('AsignacionOperadorComponent', () => {
  let component: AsignacionOperadorComponent;
  let fixture: ComponentFixture<AsignacionOperadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionOperadorComponent],
      imports: [
        MatTableModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
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
