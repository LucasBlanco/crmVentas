import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactoConHorario } from '@modelos/contacto';


@Component({
  selector: 'crm-card-agendado',
  templateUrl: './card-agendado.component.html',
  styleUrls: ['./card-agendado.component.scss']
})
export class CardAgendadoComponent implements OnInit {

  @Input() contacto: ContactoConHorario;
  @Input() disabled: boolean;
  @Output() llamar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
