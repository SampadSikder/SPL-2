import { Component, OnInit } from '@angular/core';
import { Investor } from 'src/app/models/investor.model';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ChartOptions } from '../home/home.component';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  myForm!: FormGroup;
company: Portfolio= new Portfolio();
order: Portfolio= new Portfolio();

  constructor(private portfolioService: PortfolioService,
    private modalService: NgbModal){
      
    }
  list: Portfolio[]=[];
  user: Investor=new Investor();
  public pieChart: Partial<ChartOptions> | any;
  totalProfit: number=0;


  ngOnInit(): void {
    this.list=this.portfolioService.getPortfolio();

    this.user.name="Abu Tabu";
    this.user.BO_account_no=123456789012345679n;
    this.user.phone=16276527652864n;
    this.user.email="bsse1216@iit.du.ac.bd";

    for(let company of this.list){
      this.totalProfit+=company.profit;
    }


    this.renderPieChart();
    
  }

  
  renderPieChart(): void {          
          this.pieChart = {
            chart: {
              type: 'pie',
               width: '65%',
            },
          
            series:  this.list.map((d) => d.volume), 
            labels: this.list.map((d) => d.tradeCode),            
          };
     }


     sell(){

     }

     open(content: any, i: number) {
      this.company=this.list[i];
      this.myForm = new FormGroup({
        'price': new FormControl(null, [Validators.required]),
        'quantity': new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.company.volume)])
      });
      this.modalService.open(content);
    }
  
}
