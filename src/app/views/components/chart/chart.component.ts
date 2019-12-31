import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import { DashboardChartService } from '../../services/dashboard-chart.service';

@Component({
  selector: 'crm-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chart', { static: true }) chartElementRef: ElementRef;
  @Input() height = '';
  @Input() width = '';
  @Input() id = '';
  @Input() config = {};
  public charts = [];
  constructor(public chartSrv: DashboardChartService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    let myChart = new Chart(this.chartElementRef.nativeElement, this.config);
    this.chartSrv.charts.push({id:this.id, chart:myChart});
  }
}
