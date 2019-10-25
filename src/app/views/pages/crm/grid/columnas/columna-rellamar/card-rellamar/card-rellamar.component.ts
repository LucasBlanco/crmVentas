import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactoConHorario } from '@modelos/contacto';
import { timer } from 'rxjs';

@Component({
  selector: 'crm-card-rellamar',
  templateUrl: './card-rellamar.component.html',
  styleUrls: ['./card-rellamar.component.scss']
})
export class CardRellamarComponent implements OnInit {

  @Input() contacto: ContactoConHorario;
  @Input() disabled: boolean;
  @Output() llamar = new EventEmitter();

  constructor() {
    
  }

  ngOnInit() {
  }

}
