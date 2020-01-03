import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ContactoConHorario } from '@modelos/contacto';
import * as moment from 'moment'
import { BaseCardComponent } from './../../base-card/base-card.component';


@Component({
  selector: 'crm-card-agendado',
  templateUrl: './card-agendado.component.html',
  styleUrls: ['./card-agendado.component.scss']
})
export class CardAgendadoComponent implements OnInit {

  @ViewChild(BaseCardComponent, { static: true }) baseCard: BaseCardComponent;
  @Input() contacto: ContactoConHorario;
  @Input() disabled: boolean;
  @Output() llamar = new EventEmitter();

  hora
  constructor() { }

  ngOnChanges() {
  }

  ngOnInit() {
  	this.hora = moment(this.contacto.horario).format('HH:mm')
  }

}
