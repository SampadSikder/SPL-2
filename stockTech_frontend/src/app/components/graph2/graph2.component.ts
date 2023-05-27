import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicalIndicatorsService } from 'src/app/services/technical-indicators.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
  
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  dateString :string ='';
  code:string='';
  isAuthenticated:boolean=false;
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
    this.setYear();
    console.log(this.dateString);
    this.route.params.subscribe((params) => {
      this.code = this.route.snapshot.params['code'];
    });
    this.renderIndiceGraph();
    this.renderIndiceGraph2();
    this.renderIndiceGraph6();
    this.renderIndiceGraph4();
    this.renderIndiceGraph5();
    this.renderIndiceGraph3();
    this.renderIndiceGraph7();
  }
  public lineGraph: Partial<ChartOptions> | any;
  public lineGraph2: Partial<ChartOptions> | any;
  public lineGraph3: Partial<ChartOptions> | any;
  public lineGraph4: Partial<ChartOptions> | any;
  public lineGraph5: Partial<ChartOptions> | any;
  public lineGraph6: Partial<ChartOptions> | any;
  public lineGraph7: Partial<ChartOptions> | any;

  constructor(private TecIndSer: TechnicalIndicatorsService,
    private route: ActivatedRoute,
    private auth:AuthService) { }

  setYear(){
    let currentYear = this.currentDate.getFullYear();
    this.currentDate.setFullYear(currentYear-1);
    const year =this.currentDate.getFullYear();
    const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + this.currentDate.getDate()).slice(-2);
    this.dateString = `${year}-${month}-${day}`;
  }

  receiveMACD(): Observable<any> {
    return this.TecIndSer.getMACD(this.code,this.dateString);

  }
  receivePredictions(): Observable<any> {
    return this.TecIndSer.getPredictions(this.code,this.dateString);

  }
  receiveSMA(): Observable<any> {
    return this.TecIndSer.getSMA50(this.code,this.dateString);

  }
  receiveEMA(): Observable<any> {
    return this.TecIndSer.getEMA50(this.code,this.dateString);

  }
  receiveRSI(): Observable<any> {
    return this.TecIndSer.getRSI(this.code,this.dateString);

  }
  receiveSTOCH(): Observable<any> {
    return this.TecIndSer.getSTOCH(this.code,this.dateString);

  }
  receiveBB(): Observable<any> {
    return this.TecIndSer.getBB(this.code,this.dateString);

  }



  renderIndiceGraph2(): void {
    this.receiveSTOCH().subscribe((data1) => {
      const date = data1['date'];
      const K = data1['K'];
      const D = data1['D'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          K: K[i],
          D: D[i]
        };
        data.push(item);
        
      }
      console.log(data);
      this.lineGraph = {
        chart: {
          type: 'line',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'K',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.K,
            }))
          },
          {
            name: 'D',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.D,
            }))
          }
        ],
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'right',
          markers: {
            width: 40,
            height: 8,
            strokeWidth: 0,
            radius: 0,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
        yaxis: [
          {
            labels: {
              formatter: function (val: any) {
                if (val) return val.toFixed(2);
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        ],
      };

      this.lineGraph.render();
    });
  }

  renderIndiceGraph3(): void {
    this.receiveMACD().subscribe((data1) => {
      const date = data1['date'];
      const macd = data1['macd'];
      const signal = data1['signal'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          macd: macd[i],
          signal: signal[i]
        };
        data.push(item);
        
      }
      console.log(data);
      this.lineGraph6 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'MACD',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.macd,
            }))
          },
          {
            name: 'signal',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.signal,
            }))
          }
        ],
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'right',
          markers: {
            width: 40,
            height: 8,
            strokeWidth: 0,
            radius: 0,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
        yaxis: [
          {
            labels: {
              formatter: function (val: any) {
                if (val) return val.toFixed(2);
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        ],
      };

      this.lineGraph6.render();
    });
  }

  renderIndiceGraph4(): void {
    this.receiveEMA().subscribe((data1) => {
      const date = data1['date'];
      const ema50 = data1['ema50'];
      const ema200 = data1['ema200'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          ema50: ema50[i],
          ema200: ema200[i]
        };
        data.push(item);
        
      }
      console.log(data);
      this.lineGraph4 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'ema50',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.ema50,
            }))
          },
          {
            name: 'ema200',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.ema200,
            }))
          }
        ],
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'right',
          markers: {
            width: 40,
            height: 8,
            strokeWidth: 0,
            radius: 0,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
        yaxis: [
          {
            labels: {
              formatter: function (val: any) {
                if (val) return val.toFixed(2);
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        ],
      };

      this.lineGraph4.render();
    });
  }

  renderIndiceGraph5(): void {
    this.receiveSMA().subscribe((data1) => {
      const date = data1['date'];
      const sma50 = data1['sma50'];
      const sma200 = data1['sma200'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          sma50: sma50[i],
          sma200: sma200[i]
        };
        data.push(item);
        
      }
      console.log(data);
      this.lineGraph5 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'sma50',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.sma50,
            }))
          },
          {
            name: 'sma200',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.sma200,
            }))
          }
        ],
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'right',
          markers: {
            width: 40,
            height: 8,
            strokeWidth: 0,
            radius: 0,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
        yaxis: [
          {
            labels: {
              formatter: function (val: any) {
                if (val) return val.toFixed(2);
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        ],
      };

      this.lineGraph5.render();
    });
  }
  
  renderIndiceGraph(): void {

    this.receiveRSI().subscribe((data1) => {
      const data = Object.entries(data1).map(([x, y]) => ({ x: parseInt(x), y: y }));
      console.log(data);
      this.lineGraph2 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [{
          name: 'RSI',
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
    });
  }

  renderIndiceGraph7(): void {
    
    this.receivePredictions().subscribe((data1) => {
      const dates = data1['days'];
      const predicted = data1['closing_price'];
      const data = [];
      console.log(data1);
      for (let i = 0; i < dates.length; i++) {
        const item = {
          date: dates[i],
          predicted: predicted[i]
        };
        data.push(item);
      }
      
      console.log(data);
      this.lineGraph7 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'predicted',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.predicted,
            }))
          }
        ],
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'right',
          markers: {
            width: 40,
            height: 8,
            strokeWidth: 0,
            radius: 0,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
        yaxis: [
          {
            labels: {
              formatter: function (val: any) {
                if (val) return val.toFixed(2);
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        ],
      };
      this.lineGraph7.render();
    });
  }

  renderIndiceGraph6(): void {
    this.receiveBB().subscribe((data1) => {
      const date = data1['date'];
      const upper = data1['Upper'];
      const middle = data1['Middle'];
      const lower=data1['Lower'];
      const data = [];
      for (let i = 0; i < date.length; i++) {
        const item = {
          date: parseInt(date[i]),
          U: upper[i],
          M: middle[i],
          L: lower[i]
        };
        data.push(item);
      }
      console.log(data);
      this.lineGraph3 = {
        chart: {
          type: 'line',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [
          {
            name: 'Upper',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.U,
            }))
          },
          {
            name: 'Middle',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.M,
            }))
          },
          {
            name: 'Lower',
            data: data.map(item => ({
              x: new Date(item.date),
              y: item.L,
            }))
          }
        ],
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'right',
          markers: {
            width: 40,
            height: 8,
            strokeWidth: 0,
            radius: 0,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
        yaxis: [
          {
            labels: {
              formatter: function (val: any) {
                if (val) return val.toFixed(2);
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        ],
      };

      this.lineGraph3.render();
    });
  }

}