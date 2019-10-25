import { IContacto } from '@modelos/contacto';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'crm-card-a-llamar',
  templateUrl: './card-a-llamar.component.html',
  styleUrls: ['./card-a-llamar.component.scss']
})
export class CardALlamarComponent implements OnInit {

  @Input() contacto: IContacto;
  @Input() disabled: boolean;
  @Output() llamar = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
