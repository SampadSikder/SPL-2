import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit{
  constructor( private http: HttpClient, private MarketDataService: MarketDataService,) { }
  
  isAuthenticated: boolean=false;
  
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  dataAvail = true;
  public spinner: boolean = true;
  
  
  ngOnInit(): void {
    this.renderDataTable();
    this.receiveMarketData().subscribe((data) => {
      data = data.filter(function (dat: any) {
        return dat.trading_code != '';
      });
      this.spinner = false;
      this.dtOptions.data = data;
      this.dataAvail = true;
    });

  }

  receiveMarketData(): Observable<any> {
    return this.MarketDataService.getWatchlist();
  }

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   searching: true,
    //   ordering: false,
    //   language: {
    //     searchPlaceholder: "Search...",
    //     search: ""
    //   },
    // };
    renderDataTable(): void {
    this.dtOptions = {
      lengthChange: false,
      language: {
        paginate: { next: '>', last: 'Last', first: 'First', previous: '<' },
        searchPlaceholder: "Search...",
        search: ""
      },
       pageLength: 20,
      columnDefs: [
        { width: '30em', targets: [0, 1, 2, 3, 4] },
        { name: 'some name', targets: 0 },
        { orderable: true, targets: [0, 1] },
      ],

      columns: [
        {
          title: 'CODE', data: 'trading_code',
          render: function (data, type, row) {
            row.trading_code = row.trading_code.replace(/ /g, '-');
            if (type === 'display') {
              if (row.change < 0) {
                data =
                  '<a style="color:red;" href="' +
                  row.scrip +
                  '/' +
                  row.trading_code +
                  '">' +
                  data +
                  '</a>';
              } else if (row.change == 0) {
                data =
                  '<a style="color:#2a76e8;" href="' +
                  row.scrip +
                  '/' +
                  row.trading_code +
                  '">' +
                  data +
                  '</a>';
              } else {
                data =
                  '<a style="color:green;" href="' +
                  row.scrip +
                  '/' +
                  row.trading_code +
                  '">' +
                  data +
                  '</a>';
              }
            }

            return data;
          },
        },
        { title: 'LTP', data: 'ltp' },
        { title: 'CLOSEP', data: 'closep' },
        { title: 'CHANGE', data: 'change',
          render: function (data, type, row) {
            if (type === 'display') {
              if (row.change < 0) {
                data = '<span style="color:red;">' + data + '</span>';
              } else if (row.change == 0) {
                data = '<span style="color:#2a76e8;">' + data + '</span>';
              } else {
                data = '<span style="color:green;">' + data + '</span>';
              }
            }

            return data;
          },
        },
        { title: 'YCP', data: 'ycp' },
      ]
    }
  }
 

  

}
