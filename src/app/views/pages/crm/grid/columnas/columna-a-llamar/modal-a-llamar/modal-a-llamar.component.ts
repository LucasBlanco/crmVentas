import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'crm-modal-a-llamar',
  templateUrl: './modal-a-llamar.component.html',
  styleUrls: ['./modal-a-llamar.component.scss']
})
export class ModalALlamarComponent {

  nacionalidades = [{
    nombre: 'Argentina',
    id: 1
  }];

  formALlamar = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    dni: new FormControl('', [Validators.required, Validators.min(11111111), Validators.max(99999999)]),
    nacionalidad: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required)
  });
  constructor(public dialogRef: MatDialogRef<ModalALlamarComponent>) { }

  get nombre() { return this.formALlamar.get('nombre'); }
  get apellido() { return this.formALlamar.get('apellido'); }
  get dni() { return this.formALlamar.get('dni'); }
  get nacionalidad() { return this.formALlamar.get('nacionalidad'); }
  get sexo() { return this.formALlamar.get('sexo'); }

  cargar() {
    this.formALlamar.patchValue({
      nombre: 'Lucas',
      apellido: 'Blanco',
      dni: 39268594,
      nacionalidad: 1,
      sexo: 'MASCULINO'
    });
  }
}
