import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoanComponent } from './components/loan/loan.component';
import { NoticeComponent } from './components/notice/notice.component';
import { IPOComponent } from './components/ipo/ipo.component';
import { WithdrawReqComponent } from './components/withdraw-req/withdraw-req.component';
import { SigninComponent } from './components/signin/signin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoanComponent,
    NoticeComponent,
    IPOComponent,
    WithdrawReqComponent,
    SigninComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
