import { Component, OnInit } from '@angular/core';
import { IPO } from 'src/app/models/ipo.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ipo',
  templateUrl: './ipo.component.html',
  styleUrls: ['./ipo.component.css']
})
export class IPOComponent implements OnInit {
  constructor(private auth: AuthService,private http:HttpClient) { }

  isAuthenticated: boolean = false;

  list: IPO[] = [];
  newIPO: IPO = new IPO();

  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
    this.getList();
  }


  getList() {
    this.getIPOs().subscribe((data)=>{
        this.list = data['ipos'];
    });
  }
  getIPOs() {
    const url='http://localhost:4000/admin/ipolist/';
    return this.http.post<any>(url,{});
  }

  announceIPO() {
    this.http.post<any>('http://localhost:4000/admin/addipo/',{code:this.newIPO.code,price:this.newIPO.price,quantity:this.newIPO.quantity,start:this.newIPO.end,end:this.newIPO.start}).subscribe((data)=>{
      alert("Successfully Added");
      window.location.reload();
    });
  }

}
