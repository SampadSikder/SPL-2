import { Injectable } from '@angular/core';
import { Portfolio } from '../models/portfolio.model';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  // demo: Portfolio[]=[
  //   { 
  //     tradeCode: "GP", 
  //     buyingDate: new Date('2022-01-01'), 
  //     BuyingPrice: 10.56, 
  //    LTP: 10.67,
  //    volume:100 },
  //   {
  //     tradeCode: 'AAPL',
  //     buyingDate: new Date('2022-01-01'),
  //     BuyingPrice: 9.5,
  //     LTP: 12.8,
  //     volume: 100
  //   },
  //   {
  //     tradeCode: 'GOOG',
  //     buyingDate: new Date('2022-02-15'),
  //     BuyingPrice: 11.2,
  //     LTP: 8.9,
  //     volume: 50
  //   },
  //   {
  //     tradeCode: 'AMZN',
  //     buyingDate: new Date('2022-03-31'),
  //     BuyingPrice: 14.7,
  //     LTP: 10.1,
  //     volume: 20
  //   },
  //   {
  //     tradeCode: 'MSFT',
  //     buyingDate: new Date('2022-04-14'),
  //     BuyingPrice: 12.4,
  //     LTP: 9.8,
  //     volume: 75
  //   }
  // ]

  demo: Portfolio[]=[
    new Portfolio("GP", new Date('2022-01-01'), 10.56, 10.67, 100),
    new Portfolio("AAPL", new Date('2022-01-01'), 9.5, 12.8, 100),
    new Portfolio("GOOG", new Date('2022-02-15'), 11.2, 8.9, 50),
    new Portfolio("AMZN", new Date('2022-03-31'), 14.7, 10.1, 20),
    new Portfolio("MSFT", new Date('2022-04-14'), 12.4, 9.8, 75)
  ];


  getPortfolio(): Portfolio[]{
    // for(let company of this.demo){
    //   company.profit=company.BuyingPrice-company.LTP;
    // }
    return this.demo;
  }
}
