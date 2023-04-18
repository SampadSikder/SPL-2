import { Injectable } from '@angular/core';
import { Portfolio } from '../models/portfolio.model';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  demo: Portfolio[] = [
    new Portfolio("GP", new Date('2022-01-01'), 10.56, 10.67, 100),
    new Portfolio("AAPL", new Date('2022-01-01'), 9.5, 12.8, 100),
    new Portfolio("GP", new Date('2022-02-15'), 11.2, 10.67, 50),
    new Portfolio("AMZN", new Date('2022-03-31'), 14.7, 10.1, 20),
    new Portfolio("GP", new Date('2022-02-15'), 11.2, 10.67, 350),
    new Portfolio("MSFT", new Date('2022-04-14'), 12.4, 9.8, 75)
  ];


  getPortfolio(): Portfolio[] {
    // for(let company of this.demo){
    //   company.profit=company.BuyingPrice-company.LTP;
    // }
    
    return this.demo;
  }




}
