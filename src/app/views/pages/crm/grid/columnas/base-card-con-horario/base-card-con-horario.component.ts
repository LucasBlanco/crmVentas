import { Component, ContentChild, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { timer } from 'rxjs';

import { BaseCardComponent } from '../base-card/base-card.component';

@Component({
  selector: 'crm-base-card-con-horario',
  template: `<ng-content></ng-content>`,
  styles: []
})
export class BaseCardConHorarioComponent implements OnInit {

  @ContentChild(BaseCardComponent, { static: false }) card;
  @Input() horario: { desde: string, hasta: string }
  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    timer(0, 500).subscribe(() => {
      const disabled = moment().isBefore(moment(this.horario.desde));
      this.card.updateDisabled(disabled);
    });
  }
}
