import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Venta } from '@modelos/venta';
import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'crm-buscardor-base',
  templateUrl: './buscardor-base.component.html',
  styleUrls: ['./buscardor-base.component.scss']
})
export class BuscardorBaseComponent implements OnInit {

  @Output() seleccionarVenta = new EventEmitter();
  constructor(private basesSrv: BaseSer) { }

  ctrl = new FormControl('');
  ventas: Venta[] = [];
  ventasFiltradas$: Observable<Venta[]> = from([]);

  ngOnInit() {
    this.actualizarVentas();
  }

  onSelectVenta(idVenta) {
    this.seleccionarVenta.emit(idVenta);
  }

  showVenta = (idVenta) => {
    const venta = this.ventas.find(v => v.id === idVenta);
    return `${venta.nombre}, ${venta.apellido} ${venta.cuil ? venta.cuil : ''}`;
  };

  actualizarVentas() {
    this.ventasSrv.ventasSinVisita().subscribe(ventas => {
      this.ventas = ventas;
      this.ventasFiltradas$ = this.ctrl.valueChanges
        .pipe(
          startWith(''),
          map(value => {
            const filterValue = value.toLowerCase();
            return this.ventas.filter(venta => {
              const { nombre, apellido, cuil } = venta;
              return [nombre, apellido, cuil].join('').toLowerCase().includes(filterValue);
            });
          })
        );
      this.ctrl.setValue(Number(this.idVenta));
    });
  }

}
