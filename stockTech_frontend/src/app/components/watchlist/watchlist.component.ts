import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MarketDataService, company } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  constructor(private http: HttpClient, private MarketDataService: MarketDataService,) { }

  isAuthenticated: boolean = true;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  dataAvail = true;
  public spinner: boolean = true;
  list: any;




  ngOnInit(): void {
    this.renderDataTable();
    this.receiveMarketData()
    .subscribe({
      next: (res) => {
       
        this.list = res;
        console.log(this.list);         
      },
      error: (e) => console.error(e)
    });

  }

  receiveMarketData(): Observable<company[]> {
    return this.MarketDataService.getWatchlist();
  }

  public remove(company: company) {
     alert(company.trading_code + " is removed.");

  }


  renderDataTable(): void {
   
    this.dtOptions = {
      lengthChange: false, 
      pageLength: 20,
      ordering:false
     
    }}




      // columns: [
      //   {
      //     title: 'CODE', data: 'trading_code',
      //     render: function (data, type, row) {
      //       row.trading_code = row.trading_code.replace(/ /g, '-');
      //       if (type === 'display') {
      //         if (row.change < 0) {
      //           data =
      //             '<a style="color:red;" href="' +
      //             row.scrip +
      //             '/' +
      //             row.trading_code +
      //             '">' +
      //             data +
      //             '</a>';
      //         } else if (row.change == 0) {
      //           data =
      //             '<a style="color:#2a76e8;" href="' +
      //             row.scrip +
      //             '/' +
      //             row.trading_code +
      //             '">' +
      //             data +
      //             '</a>';
      //         } else {
      //           data =
      //             '<a style="color:green;" href="' +
      //             row.scrip +
      //             '/' +
      //             row.trading_code +
      //             '">' +
      //             data +
      //             '</a>';
      //         }
      //       }

      //       return data;
      //     },
      //   },
      //   { title: 'LTP', data: 'ltp' },
      //   { title: 'CLOSEP', data: 'closep' },
      //   {
      //     title: 'CHANGE', data: 'change',
      //     render: function (data, type, row) {
      //       if (type === 'display') {
      //         if (row.change < 0) {
      //           data = '<span style="color:red;">' + data + '</span>';
      //         } else if (row.change == 0) {
      //           data = '<span style="color:#2a76e8;">' + data + '</span>';
      //         } else {
      //           data = '<span style="color:green;">' + data + '</span>';
      //         }
      //       }

      //       return data;
      //     },
      //   },
      //   { title: 'YCP', data: 'ycp' },
      //   {
      //     title: 'Action',
      //     data:null,
      //     render: function (data, type, row) {
      //       return '<button class="btn btn-primary btn-sm" onclick="remove(\'' + row.trading_code + '\')">Remove</button>';
      //     }
      //   },
        

      // ],
   


    }



