import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BaseCardComponent } from '../../base-card/base-card.component';
import { getFakeContacto } from './../../../../../../models/contacto';
import { CardALlamarComponent } from './card-a-llamar.component';

describe('CardALlamarComponent', () => {
  let component: CardALlamarComponent;
  let fixture: ComponentFixture<CardALlamarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardALlamarComponent, BaseCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardALlamarComponent);
    component = fixture.componentInstance;
    component.contacto = getFakeContacto();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia mostrar un contacto correctamente', () => {
    const nombre: HTMLElement = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    const cuil: HTMLElement = fixture.debugElement.query(By.css('.card-subtitle')).nativeElement;
    expect(nombre.textContent).toEqual(getFakeContacto().nombre);
    expect(cuil.textContent).toEqual(getFakeContacto().cuil);
  });

  it('deberia emitir el evento llamar', () => {
    const boton: HTMLElement = fixture.debugElement.query(By.css('img')).nativeElement;
    component.llamar.subscribe(() => {
      expect(true).toBeTruthy();
    });
    boton.click();
  });
});
