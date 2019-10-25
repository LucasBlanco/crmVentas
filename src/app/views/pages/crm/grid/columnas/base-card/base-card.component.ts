import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';

@Component({
  selector: 'crm-base-card',
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss']
})
export class BaseCardComponent implements OnInit {

  @Input() disabled: boolean;
  @Output() llamar = new EventEmitter();

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  updateDisabled(x) {
    this.disabled = x;
    this.cdr.detectChanges();
  }

}