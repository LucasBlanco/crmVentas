import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VisitaService } from './../../../services/visita.service';
import { BuscadorVentaComponent } from './../buscador-venta/buscador-venta.component';
import { FormularioVisitaComponent } from './../formulario-visita/formulario-visita.component';

@Component({
  selector: 'crm-carga-visita',
  templateUrl: './carga-visita.component.html',
  styleUrls: ['./carga-visita.component.scss']
})
export class CargaVisitaComponent implements OnInit {
  @ViewChild(FormularioVisitaComponent, { static: true }) formVisitaComponent: FormularioVisitaComponent;
  @ViewChild(BuscadorVentaComponent, { static: true }) buscardorVenta: BuscadorVentaComponent;
  idVenta: number;

  constructor(private visitaSrv: VisitaService, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.idVenta = params['idVenta'];
    });
  }

  ngOnInit() {
  }

  guardar() {
    this.formVisitaComponent.form.markAllAsTouched();
    if (this.formVisitaComponent.form.valid) {
      const visita = this.formVisitaComponent.formToVisita();
      visita.idVenta = this.idVenta;
      this.visitaSrv.crear(visita).subscribe(
        () => {
          this.reset();
        }
      );
    }
  }

  reset() {
    this.formVisitaComponent.form.reset();
    this.idVenta = null;
    this.buscardorVenta.actualizarVentas();
  }






}
