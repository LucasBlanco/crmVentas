import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Columnas } from '@servicios/crm.service';

@Component({
  selector: 'crm-base-modal',
  template: ''
})
export class BaseModalComponent implements OnInit {

  modalRef;
  modalTemplateRef;
  constructor(private modalService: NgbModal) { }
  @Output() moverA = new EventEmitter<Columnas>();

  ngOnInit() {
  }

  open() {
    this.modalRef = this.modalService.open(this.modalTemplateRef, {
      size: 'lg'
    });
  }

  close() {
    this.modalRef.close();
  }

  moverALlamar() {
    this.moverA.emit(Columnas.ALLAMAR);
  }
  moverAReLlamar() {
    this.moverA.emit(Columnas.RELLAMAR);
  }
  moverAAgendado() {
    this.moverA.emit(Columnas.AGENDADO);
  }
}
