import { Component, OnInit } from '@angular/core';
import { MarketDataService } from 'src/app/services/market-data.service';
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
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})



export class GraphComponent implements OnInit {

  public lineGraph: Partial<ChartOptions> | any;
  

  // code: string = "GP";
  // dateNow: Date = new Date();
  // dateFrom: string = "2022-03-19";

  constructor(private MarketDataService:MarketDataService) { }
  ngOnInit(): void {
    this.renderIndiceGraph2("dsex");
  }
  receiveDseIndices(): Observable<any> {
    return this.MarketDataService.getIndices();

  }

  renderIndiceGraph2(index: string): void {

    this.receiveDseIndices().subscribe((data1) => {
      const data2 = data1[index];
      const data = Object.entries(data2).map(([x, y]) => ({ x: parseInt(x), y: y }));
      this.lineGraph = {
        chart: {
          type: 'area',
          height: '140%',
          width: '100%',
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
            format: 'h:mm',
          }
        },
      };
      this.lineGraph.render();
    })
  }
  

}