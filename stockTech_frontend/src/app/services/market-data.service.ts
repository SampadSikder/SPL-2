import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:4000/api/marketData';
const baseUrl1 = 'http://localhost:4000/api/indices';
const baseUrl2 = 'http://localhost:4000/api/sectorwise';
const baseUrl3 = 'http://localhost:4000/api/companyprofile';
const baseUrl4 = 'http://localhost:4000/api/companyFinance';




export class company {
  trading_code: string;
  full_name: string;
  ltp: number;
  closep: number;
  change: number;
  ycp: number;

  constructor() {
    this.trading_code = '';
    this.ltp = 0;
    this.closep = 0;
    this.change = 0;
    this.ycp = 0;
    this.full_name = '';
  }
}

export class sector {
  category: string[];
  value: number[];
  yvalue: number[];
  volume: number[];
  gainer: number[];
  loser: number[];
  neutral: number[];
  total: number[];

  constructor() {
    this.category = [];
    this.value = [];
    this.yvalue = [];
    this.volume = [];
    this.gainer = [];
    this.loser = [];
    this.neutral = [];
    this.total = [];
  }
}


export class index {
  dsex: string;
  dses: string;
  ds30: string;

  constructor() {
    this.dsex = '';
    this.dses = '';
    this.ds30 = '';
  }
}

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  

  constructor(private http: HttpClient) { }

  getMarketData(): Observable<company[]> {
    return this.http.get<any>(baseUrl);
  }

  getWatchlist(): Observable<company[]> {
    return this.http.get<any>(baseUrl);
    // throw new Error('Method not implemented.');
  }

  getFinance(): Observable<any> {
    return this.http.get<any>(baseUrl4);
  }

  getSectorWiseData(): Observable<sector> {
    return this.http.get<any>(baseUrl2);
  }

  getIndices(): Observable<index> {
    return this.http.get<any>(baseUrl1);
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(baseUrl3);
   // return this.http.post(baseUrl3,code);
  }

}