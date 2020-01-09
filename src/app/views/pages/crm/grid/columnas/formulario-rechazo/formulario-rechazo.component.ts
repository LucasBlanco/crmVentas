import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrmService } from '@servicios/crm.service';

@Component({
  selector: 'crm-formulario-rechazo',
  templateUrl: './formulario-rechazo.component.html',
  styleUrls: ['./formulario-rechazo.component.scss']
})
export class FormularioRechazoComponent implements OnInit {

  @Output() guardar = new EventEmitter<{ observacion: string }>();
  form = new FormGroup({
    observacion: new FormControl('', Validators.required)
  });

  observaciones = [
    'No le interesa',
    'No trabaja',
    'Colgo el telefono',
    'Monotributista',
    'Enfermo',
    'Conforme con obra social',
    'Capita',
    'Convenio de obra social',
	'No contesta',
	'Inexistente',
	'No disponible',
	'Equivocado',
	'Falta numero',
	'Contestador automatico',
	'Edad',
  ]

  constructor(private carmSrv: CrmService) { }

  ngOnInit() {
  }

  rechazar() {
    console.log('rechazo')
    this.guardar.emit({ observacion: this.form.get('observacion').value });
  }
}
