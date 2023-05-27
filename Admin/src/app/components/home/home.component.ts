import { Investor } from 'src/app/models/investor.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private auth: AuthService,private http:HttpClient){}
    
  investors: Investor[] = [];
  isAuthenticated: boolean=false;

  ngOnInit(): void { 
    this.auth.check1((isAuthenticated) => {
        if (isAuthenticated) {
          this.isAuthenticated=true;
        } else {
          this.isAuthenticated=false;
        }
      });
    this.getInvestorList();
  }

  getInvestorList() {
    this.geInvestors().subscribe((data)=>{
        this.investors = data['list'];
    });
  }
  geInvestors() {
    const url='http://localhost:4000/admin/getList/';
    return this.http.post<any>(url,{});
  }


  selectedInvestor: Investor =new Investor();

  onSelect(investor: Investor): void {
    this.selectedInvestor = investor;
  }

  remove(investor: Investor): void {
    this.http.post('http://localhost:4000/admin/delete/',{bo:investor.bo}).subscribe((data)=>{
        alert("Deleted Successfully.");
        window.location.reload();
    });
  }

}
