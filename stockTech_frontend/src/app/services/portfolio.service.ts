import { Injectable } from '@angular/core';
import { Portfolio } from '../models/portfolio.model';
import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }




  getPortfolio() {
    return this.http.post<any>('http://localhost:4000/api/getPortfolio/',{});
  }

  addWatch(code:string){
    return this.http.post<any>('http://localhost:4000/api/addWatchlist/',{code:code});
  }


}
