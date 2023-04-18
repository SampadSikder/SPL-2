import { Component, OnInit } from '@angular/core';
import { Investor } from 'src/app/models/investor.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  user: Investor=new Investor();
  

  ngOnInit(): void {
    this.user.name = "Abu Tabu";
    this.user.BO_account_no = 123456789012345679n;
    this.user.phone = 16276527652864n;
    this.user.email = "bsse1216@iit.du.ac.bd";
  }
 
 

}
