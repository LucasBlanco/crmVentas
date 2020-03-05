import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import _ from 'lodash/fp';
import { Observable } from 'rxjs';

import { Venta } from './../../../models/venta';
import { MisVentasService } from './../../../services/ventas.service';

@Component({
  selector: 'crm-ventas-pendientes-de-visita',
  templateUrl: './ventas-pendientes-de-visita.component.html',
  styleUrls: ['./ventas-pendientes-de-visita.component.scss']
})
export class VentasPendientesDeVisitaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ventas: Venta[] = [];
  ventasFiltradas: Venta[] = [];
  ventasPaginadas: Venta[] = [];
  nroPagina$: Observable<number>;
  filtro = new FormControl('');
  constructor(private ventasService: MisVentasService, private router: Router) {
  }

  ngOnInit() {
    this.ventasService.ventasSinVisita().subscribe(
      ventas => {
        this.ventas = ventas;
        this.ventasFiltradas = this.ventas;
        this.getPagina(0);
      }
    );
    this.filtro.valueChanges.subscribe(filtro => {
      const cumpleFiltro = (venta) => `${venta.nombre}${venta.apellido}${venta.cuil}`.toLowerCase().includes(filtro.toLowerCase());
      this.ventasFiltradas = this.ventas.filter(v => cumpleFiltro(v));
      this.paginator.firstPage();
      this.getPagina(0);
    });
  }

  getPagina(nroPagina) {
    this.ventasPaginadas = _.chunk(10, this.ventasFiltradas)[nroPagina];
  }


  irAGenerarVista(idVenta) {
    this.router.navigate(['cargarVisita/' + idVenta]);
  }
}
