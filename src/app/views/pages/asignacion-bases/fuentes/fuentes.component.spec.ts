import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { getFakeFuente } from '@modelos/fuente';
import { BehaviorSubject } from 'rxjs';

import { FuentesComponent } from './fuentes.component';


describe('FuentesComponent', () => {
  let component: FuentesComponent;
  let fixture: ComponentFixture<FuentesComponent>;
  const fuentes = new BehaviorSubject([getFakeFuente(), getFakeFuente(), getFakeFuente()]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuentesComponent],
      imports: [
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia redireccionar con el id correspondiente', () => {
    component.fuentes$ = fuentes;
    fixture.detectChanges();
    spyOn(component, 'goToAsignacionBases');
    fixture.debugElement.query(By.css('#testBotonAsignar0')).triggerEventHandler('click', null);
    expect(component.goToAsignacionBases).toHaveBeenCalledWith(fuentes.value[0].id);
    const texto = fixture.debugElement.query(By.css('mat-card-title')).nativeElement.textContent;
    expect(texto).toBe('Bases');
  });

});
