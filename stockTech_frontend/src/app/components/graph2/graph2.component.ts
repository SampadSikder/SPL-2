import { Component, OnInit } from '@angular/core';
import { TechnicalIndicatorsService } from 'src/app/services/technical-indicators.service';
import { company, sector } from 'src/app/services/market-data.service';
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
export class Graph2Component implements OnInit{
  ngOnInit(): void {
    this.renderIndiceGraph2();
    this.renderIndiceGraph();
    this.renderIndiceGraph3();
  }
  public lineGraph: Partial<ChartOptions> | any;
  public lineGraph2: Partial<ChartOptions> | any;
  public lineGraph3: Partial<ChartOptions> | any;

  constructor(private TecIndSer: TechnicalIndicatorsService) { }

  

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
        }],
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
      this.lineGraph3.render();
    })
  }
}
