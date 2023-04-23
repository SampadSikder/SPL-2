import { Component, OnInit } from '@angular/core';
import { IPO } from 'src/app/models/ipo.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ipo',
  templateUrl: './ipo.component.html',
  styleUrls: ['./ipo.component.css']
})
export class IPOComponent implements OnInit {
  constructor(private auth: AuthService){}
    

newIPO:IPO= new IPO();
isAuthenticated: boolean=false;

list: IPO[]=[];

  ngOnInit(): void {
    this.isAuthenticated=this.auth.isAuthenticated;
   this.getList();
  }


  getList() {
    //add list here
    this.list=[
      { tradeCode: 'AAPL', date: new Date('2022-01-01'), price: 150.0, quantity: 1000 },
      { tradeCode: 'GOOG', date: new Date('2022-01-03'), price: 200.0, quantity: 500 },
      { tradeCode: 'FB', date: new Date('2022-01-05'), price: 120.0, quantity: 800 },
      { tradeCode: 'TSLA', date: new Date('2022-01-07'), price: 500.0, quantity: 200 },
      { tradeCode: 'AMZN', date: new Date('2022-01-09'), price: 300.0, quantity: 400 },
    
    ]
  }

  announceIPO(){
    
  }

}
