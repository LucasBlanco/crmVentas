import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { EstadisticasBaseService } from '../../../services/estadisticas-base.service';

@Component({
  selector: 'crm-estadisiticas-base',
  templateUrl: './estadisiticas-base.component.html',
  styleUrls: ['./estadisiticas-base.component.scss']
})
export class EstadisiticasBaseComponent implements OnInit {

  config = {
    type: 'doughnut',
    data: { labels: [], datasets: [] }
  };
  baseConfig$ = new BehaviorSubject(this.config);
  vendiblesConfig$ = new BehaviorSubject(this.config);
  invendiblesConfig$ = new BehaviorSubject(this.config);
  incontactablesConfig$ = new BehaviorSubject(this.config);
  vendidosConfig$ = new BehaviorSubject(this.config);
  constructor(private estadisticaSrv: EstadisticasBaseService) { }

  ngOnInit() {
    this.estadisticaSrv.traerVentasPorBase(1)
      .pipe(map(this.mapToConfig))
      .subscribe(config => { this.baseConfig$.next(config); });
    this.estadisticaSrv.traerVentasVendibles(1)
      .pipe(map(this.mapToConfig))
      .subscribe(config => { this.vendiblesConfig$.next(config); });
    this.estadisticaSrv.traerVentasInvendibles(1)
      .pipe(map(this.mapToConfig))
      .subscribe(config => { this.invendiblesConfig$.next(config); });
    this.estadisticaSrv.traerVentasIncontactables(1)
      .pipe(map(this.mapToConfig))
      .subscribe(config => { this.incontactablesConfig$.next(config); });
    this.estadisticaSrv.traerVentasVendidos(1)
      .pipe(map(this.mapToConfig))
      .subscribe(config => { this.vendidosConfig$.next(config); });
  }

  mapToConfig(datasets) {
    return {
      type: 'doughnut',
      data: datasets,
      options: {
        maintainAspectRatio: false
      }
    };
  }

}
