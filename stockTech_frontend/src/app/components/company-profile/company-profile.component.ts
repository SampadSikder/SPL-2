import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { company, MarketDataService } from 'src/app/services/market-data.service';
import { ChartOptions } from '../home/home.component';
import { TechnicalIndicatorsService } from 'src/app/services/technical-indicators.service';

import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:4000/api/companyprofile';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  public lineGraph: Partial<ChartOptions> | any;
  public pieChart: Partial<ChartOptions> | any;
  public pieChart2: Partial<ChartOptions> | any;
  y: number[] = Array(3).fill(0);
  dtOptions: DataTables.Settings = {};
  newsData: any;
  NewsService: any;
  code: string='';
  basicData: any;

  constructor(private MarketDataService: MarketDataService,
    private http: HttpClient,
    private TechnicalIndicatorsService: TechnicalIndicatorsService) { }


  ngOnInit(): void {
    //this.renderIndiceGraph("dsex");
    this.renderPieChart();
    this.receiveNews();
  }


//   getProfile(code: string): Observable<any>{
//     //return this.TechnicalIndicatorsService.getProfile(code);
// }

  receiveMarketData(): Observable<any> {
    return this.MarketDataService.getMarketData();
  }

  receiveDseIndices(): Observable<any> {
    return this.MarketDataService.getIndices();
  }

  receiveNews(): void {  
    this.NewsService.getNews()
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.newsData = res;         
        },
        error: (e: any) => console.error(e)
      });
  }

  showData(): void{
    // this.TechnicalIndicatorsService.getProfile(this.code)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.basicData=res;     
    //     },
    //     error: (e) => console.error(e)
    //   });
  }

  
  // renderIndiceGraph(index: string): void {

  //   this.getProfile(this.code).subscribe((data1) => {
  //     const data2 = data1[index];
  //     const data = Object.entries(data2).map(([x, y]) => ({ x: parseInt(x), y: y }));

  //     this.lineGraph = {
  //       chart: {
  //         type: 'area',
  //         height: '140%',
  //         width: '100%',
  //         zoom: {
  //           type: 'x',
  //           enabled: true,
  //           autoScaleYaxis: true,
  //         },
  //       },
  //       series: [{
  //         name: 'Index',
  //         data: data,
  //       }],
  //       xaxis: {
  //         type: 'datetime',
  //         labels: {
  //           format: 'h:mm',
  //         }
  //       },
  //       fill: {
  //         colors: ['#ffffff'],
  //         type: 'gradient',
  //         gradient: {
  //           shadeIntensity: 1,
  //           inverseColors: false,
  //           opacityFrom: 0.7,
  //           opacityTo: 0.6,
  //           stops: [0, 90, 100],
  //         },
  //       },
  //       grid: {
  //         borderColor: '#f1f1f1',
  //       },

  //     };
  //     this.lineGraph.render();

  //   })
  // }

  renderPieChart(): void {
    this.receiveMarketData().subscribe((data: company[]) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].change > 0) {
          this.y[0]++;
        }
        else if (data[i].change < 0) {
          this.y[1]++;
        }
        else { this.y[2]++; }
      }

      const categories = ['Gainers', 'Losers', 'Neutral'];
      const colours = ['#00FF00', '#FF0000', '#0000FF'];
      console.log(this.y);
      this.pieChart = {
        chart: {
          type: 'pie',
          height: '100%',
          width: '100%',
        },
        series: this.y,
        labels: categories,
        colors: colours
      };
    })
  }

  
  renderPieChart2(): void {
    this.receiveMarketData().subscribe((data: company[]) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].change > 0) {
          this.y[0]++;
        }
        else if (data[i].change < 0) {
          this.y[1]++;
        }
        else { this.y[2]++; }
      }

      const categories = ['Gainers', 'Losers', 'Neutral'];
      const colours = ['#00FF00', '#FF0000', '#0000FF'];
      console.log(this.y);
      this.pieChart2 = {
        chart: {
          type: 'pie',
          height: '100%',
          width: '100%',
        },
        series: this.y,
        labels: categories,
        colors: colours
      };
    })
  }

  renderDataTable(): void {
    this.dtOptions = {
      columnDefs: [
        { width: '60em', targets: 0 },
        { width: '30em', targets: [1, 2, 3, 4, 5] },

      ],
      columns: [
        {
          title: 'Particulars',
          data: '',
        },
        {
          title: '2022',
          data: '2022',
        },
        {
          title: '2021',
          data: '2021',
        },
        {
          title: '2020',
          data: '2020',
        },
        {
          title: '2019',
          data: '2019',
        }, {
          title: '2018',
          data: '2018',
        },
      ],
    };
  }



}
