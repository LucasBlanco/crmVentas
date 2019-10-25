import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getFakeContactoConHorario } from '@modelos/contacto';

import { BaseCardConHorarioComponent } from '../../base-card-con-horario/base-card-con-horario.component';
import { BaseCardComponent } from '../../base-card/base-card.component';
import { CardRellamarComponent } from './card-rellamar.component';

describe('CardRellamarComponent', () => {
  let component: CardRellamarComponent;
  let fixture: ComponentFixture<CardRellamarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardRellamarComponent, BaseCardComponent, BaseCardConHorarioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRellamarComponent);
    component = fixture.componentInstance;
    component.contacto = getFakeContactoConHorario();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia mostrar un contacto correctamente', () => {
    const nombre: HTMLElement = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    const cuil: HTMLElement = fixture.debugElement.query(By.css('.card-subtitle')).nativeElement;
    expect(nombre.textContent).toEqual(getFakeContactoConHorario().nombre);
    expect(cuil.textContent).toEqual(getFakeContactoConHorario().cuil);
  });

  it('deberia emitir el evento llamar', () => {
    const boton: HTMLElement = fixture.debugElement.query(By.css('img')).nativeElement;
    component.llamar.subscribe(() => {
      expect(true).toBeTruthy();
    });
    boton.click();
  });

});
