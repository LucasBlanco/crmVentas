import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DashboardChartService } from '../../services/dashboard-chart.service';


@Component({
  selector: 'crm-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart', { static: true }) chartElementRef: ElementRef;
  @Input() height = '';
  @Input() width = '';
  @Input() id = '';
  @Input() config: BehaviorSubject<any>;
  chart;
  constructor(public chartSrv: DashboardChartService) { }


  ngAfterViewInit() {
    this.chart = new Chart(this.chartElementRef.nativeElement, this.config.value);
    this.config.subscribe(this.reload.bind(this));
  }

  reload(config) {
    this.chart.destroy();
    this.chart = new Chart(this.chartElementRef.nativeElement, config);
  }

  ngOnDestroy() {
    this.chart.destroy();
  }
}
