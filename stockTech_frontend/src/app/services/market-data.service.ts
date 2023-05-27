import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:4000/api/marketData';
const baseUrl1 = 'http://localhost:4000/api/indices';
const baseUrl2 = 'http://localhost:4000/api/sectorwise';
const baseUrl3 = 'http://localhost:4000/api/companyprofile/';
const baseUrl4 = 'http://localhost:4000/api/companyFinance/';
const baseUrl5 = 'http://localhost:4000/api/price/';
const baseUrl6 = 'http://localhost:4000/api/bullbear/';




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

  getWatchlist(): Observable<any> {
    return this.http.post<any>('http://localhost:4000/api/selectWatchlist/',{});
    // throw new Error('Method not implemented.');
  }

  removeWatchlist(code: string) {
    return this.http.post<any>('http://localhost:4000/api/deleteWatchlist/',{code:code});
  }
  getFinance(code:string): Observable<any> {
    return this.http.post<any>(baseUrl4,{code:code});
  }

  getSectorWiseData(): Observable<sector> {
    return this.http.get<any>(baseUrl2);
  }

  getIndices(): Observable<index> {
    return this.http.get<any>(baseUrl1);
  }

  getProfile(code:string): Observable<any> {
    return this.http.post<any>(baseUrl3,{code:code});
   // return this.http.post(baseUrl3,code);
  }
  getBullBear(code:string): Observable<any> {
    return this.http.post<any>(baseUrl6,{code:code});
   // return this.http.post(baseUrl3,code);
  }

  getPrice(code:string,dateFrom:string): Observable<any> {
    return this.http.post<any>(baseUrl5,{code:code,dateFrom:dateFrom});
   // return this.http.post(baseUrl3,code);
  }

}