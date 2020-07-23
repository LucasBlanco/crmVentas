import { EstadoService } from '@servicios/estado.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrmService } from '@servicios/crm.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'crm-formulario-rechazo',
  templateUrl: './formulario-rechazo.component.html',
  styleUrls: ['./formulario-rechazo.component.scss']
})
export class FormularioRechazoComponent implements OnInit {

  @Output() guardar = new EventEmitter<{ tipo: string; }>();
  tiposRechazo$: Observable<any>;
  form = new FormGroup({
    tipo: new FormControl('', Validators.required)
  });

  constructor(private carmSrv: CrmService, private estadoSrv: EstadoService) { }

  ngOnInit() {
    this.tiposRechazo$ = this.estadoSrv.rechazosEnLlamado();
  }

  rechazar() {
    this.guardar.emit({ tipo: this.form.get('tipo').value });
  }
}
