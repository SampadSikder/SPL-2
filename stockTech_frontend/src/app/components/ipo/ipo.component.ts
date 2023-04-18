import { Component, OnInit } from '@angular/core';
import { IPO, appliedIPO } from 'src/app/models/ipo.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ipo',
  templateUrl: './ipo.component.html',
  styleUrls: ['./ipo.component.css']
})
export class IPOComponent implements OnInit{
  myForm!: FormGroup;
  isAuthenticated: boolean = true;
  constructor(private modalService: NgbModal,) {}

  selected: IPO = new IPO;
  sendIPO: appliedIPO=new appliedIPO;
  list2:appliedIPO[] = [
    {
      ipo: {
        code: 'AAPL',
        date: new Date(2023, 5, 1),
        price: 200,
        quantity: 1000,
      },
      allocatedQuantity:566,
      applyDate: new Date(2023, 5, 2),
      status: 'Pending',
    },
    {
      ipo: {
        code: 'GOOG',
        date: new Date(2023, 5, 15),
        price: 300,
        quantity: 500,
      },
      allocatedQuantity:56,
      applyDate: new Date(2023, 5, 16),
      status: 'Approved',
    },
    {
      ipo: {
        code: 'AMZN',
        date: new Date(2023, 6, 1),
        price: 150,
        quantity: 2000,
      },
      allocatedQuantity:866,
      applyDate: new Date(2023, 6, 2),
      status: 'Rejected',
    },
  ];
  


  list: IPO[]=[
    {
      code: 'ABC',
      date: new Date('2023-05-01'),
      price: 10.0,
      quantity: 1000,
    },
    {
      code: 'DEF',
      date: new Date('2023-05-02'),
      price: 12.0,
      quantity: 2000,
    },
    {
      code: 'GHI',
      date: new Date('2023-05-03'),
      price: 8.0,
      quantity: 1500,
    },
  ];
  

  ngOnInit(): void {
    this.getList();
    this.getHistory();
  }

  getHistory() {
    throw new Error('Method not implemented.');
  }
  getList() {
    throw new Error('Method not implemented.');
  }

  apply(){
    this.sendIPO.ipo=this.selected;
    this.sendIPO.applyDate=new Date();
    this.sendIPO.status='pending';
    //send request
  }

  open(content: any, i: number) {
    this.selected = this.list[i]; 
    this.myForm = new FormGroup({
      'quantity': new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.selected.quantity)])
    }); 
    this.modalService.open(content);
  }

 
}
