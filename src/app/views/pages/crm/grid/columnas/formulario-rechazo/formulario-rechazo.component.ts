import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrmService } from '@servicios/crm.service';

@Component({
  selector: 'crm-formulario-rechazo',
  templateUrl: './formulario-rechazo.component.html',
  styleUrls: ['./formulario-rechazo.component.scss']
})
export class FormularioRechazoComponent implements OnInit {

  form = new FormGroup({
    observacion: new FormControl('', Validators.required)
  });
  observaciones = [
    'Tiene piojitos'
  ]

  constructor(private carmSrv: CrmService) { }

  ngOnInit() {
  }

  rechazar() {
    console.log(this.form.get('observacion').value)
  }
}
