import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PermissionDirective } from 'src/app/directives/permission.directive';
import { Toast1Component } from 'src/app/layout/componentes/toast-1/toast-1.component';
import { Table1Component } from 'src/app/layout/componentes/table-1/table-1.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { RouterLink } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    PermissionDirective,
    Toast1Component,
    Table1Component,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  @ViewChild('chart_pie') chart_pie!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsPie: Partial<ChartOptionsPie>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'valor',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'Gráfico',
      },
      xaxis: {
        categories: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
        ],
      },
    };

    this.chartOptionsPie = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['A', 'B', 'C', 'D', 'E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  ngOnInit() {}
}
