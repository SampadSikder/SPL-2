import { Component, OnInit } from '@angular/core';
import { TechnicalIndicatorsService } from 'src/app/services/technical-indicators.service';
import { Observable } from 'rxjs';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css']
})
export class Graph2Component implements OnInit {
  y: [number, number, number, number] = [0, 0, 0, 0];
  ngOnInit(): void {
    this.renderIndiceGraph2();
    this.renderIndiceGraph();
    this.renderIndiceGraph3();
  }
  public lineGraph: Partial<ChartOptions> | any;
  public lineGraph2: Partial<ChartOptions> | any;
  public lineGraph3: Partial<ChartOptions> | any;

  constructor(private TecIndSer: TechnicalIndicatorsService,
  ) { }
  isAuthenticated: boolean = true;



  receiveMACD(): Observable<any> {
    return this.TecIndSer.getMACD();

  }
  receiveSMA(): Observable<any> {
    return this.TecIndSer.getSMA50();

  }
  receiveEMA(): Observable<any> {
    return this.TecIndSer.getEMA50();

  }

  renderIndiceGraph2(): void {

    this.receiveMACD().subscribe((data1) => {
      const data = Object.entries(data1).map(([x, y]) => ({ x: parseInt(x), y: y }));

      this.lineGraph = {
        chart: {
          type: 'area',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [{
          name: 'Index',
          data: data,
        }

        ],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
      };
      this.lineGraph.render();
    })
  }

  renderIndiceGraph(): void {

    this.receiveSMA().subscribe((data1) => {
      const data = Object.entries(data1).map(([x, y]) => ({ x: parseInt(x), y: y }));
      console.log(data);
      this.lineGraph2 = {
        chart: {
          type: 'area',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [{
          name: 'Index',
          data: data,
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
      };
      this.lineGraph2.render();
    })
  }

  renderIndiceGraph3(): void {

    this.receiveEMA().subscribe((data1) => {
      const data = Object.entries(data1).map(([x, y]) => ({ x: parseInt(x), y: y }));
      console.log(data);
      this.lineGraph3 = {
        chart: {
          type: 'candlestick',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        // series: [{
        //   name: 'Index',
        //   data: data,
        // }],
        series: [{
          data: [
            { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
            { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
            { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
            { x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] },
            { x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
            { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
            { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
            { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
            { x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] },
            { x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
            { x: new Date(1538787600000), y: [6624.53, 6636.03, 6621.68, 6624.31] },
            { x: new Date(1538789400000), y: [6624.61, 6632.2, 6617, 6626.02] },
            { x: new Date(1538791200000), y: [6627, 6627.62, 6584.22, 6603.02] },
            { x: new Date(1538793000000), y: [6605, 6608.03, 6598.95, 6604.01] },
            { x: new Date(1538794800000), y: [6604.5, 6614.4, 6602.26, 6608.02] },
            { x: new Date(1538796600000), y: [6608.02, 6610.68, 6601.99, 6608.91] },
            { x: new Date(1538798400000), y: [6608.91, 6618.99, 6608.01, 6612] },
            { x: new Date(1538800200000), y: [6612, 6615.13, 6605.09, 6612] },
            { x: new Date(1538802000000), y: [6612, 6624.12, 6608.43, 6622.95] },
            { x: new Date(1538803800000), y: [6623.91, 6623.91, 6615, 6615.67] },
            { x: new Date(1538805600000), y: [6618.69, 6618.74, 6610, 6610.4] },
            { x: new Date(1538807400000), y: [6611, 6622.78, 6610.4, 6614.9] },
            { x: new Date(1538809200000), y: [6614.9, 6626.2, 6613.33, 6623.45] },
            { x: new Date(1538811000000), y: [6623.48, 6627, 6618.38, 6620.35] },
          ]
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
      };
      this.lineGraph3.render();
    })
  }

  //   renderIndiceGraph4(): void {

  //     this.receiveEMA().subscribe((data1) => {
  //       const data = Object.entries(data1).map(([x, y]) => ({ x: parseInt(x), y: y }));

  // this.lineGraph = {
  //   chart: {
  //     type: 'candlestick',
  //     height: '250%',
  //     width: '90%',
  //     zoom: {
  //       type: 'x',
  //       enabled: true,
  //       autoScaleYaxis: true,
  //     },
  //   },
  //   series: [{
  //     data: data.map((d) => {
  //       return {
  //         x: d.x,
  //         y: [d.y.open, d.y.high, d.y.low, d.y.close]
  //       }
  //     }),
  //   }],
  //   xaxis: {
  //     type: 'datetime',
  //     labels: {
  //       format: 'dd/MM',
  //     }
  //   },
  // };
  // this.lineGraph.render();

  //     })
  //   }
}
