import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MarketDataService, company } from 'src/app/services/market-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  constructor(private router: Router,private http: HttpClient, private MarketDataService: MarketDataService,private auth:AuthService) { }

  isAuthenticated: boolean = false;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  dataAvail = true;
  public spinner: boolean = true;
  list: any;

  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
    this.receiveWatchList();

  }

  receiveWatchList(): void {
    this.MarketDataService.getWatchlist().subscribe((data1) => { 
      this.list=data1['list'];
    });
  }

  remove(code: string) {
    this.MarketDataService.removeWatchlist(code).subscribe((data1) => {
    });
    window.location.reload();
}
  handler(code:string){
    this.router.navigate(["company/" + code]);
  }

}