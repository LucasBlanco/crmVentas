import { Component, EventEmitter, Output } from '@angular/core';
import { Columnas } from '@servicios/crm.service';

@Component({
  selector: 'crm-base-modal',
  template: ''
})
export class BaseModalComponent {

  @Output() moverA = new EventEmitter<Columnas>();
  @Output() rechazar = new EventEmitter<{ observacion: string, id: number }>();
  @Output() agendar = new EventEmitter<{ fechaYHoraDeProximoContacto: string, nota: string }>();
  @Output() rellamar = new EventEmitter<{ fechaYHoraDeProximoContacto: string, nota: string }>();
  @Output() vender = new EventEmitter();

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
