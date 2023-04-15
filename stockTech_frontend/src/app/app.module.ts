import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {NgApexchartsModule} from 'ng-apexcharts';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { BoaccountopeningComponent } from './components/boaccountopening/boaccountopening.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { GraphComponent } from './components/graph/graph.component';
import { Graph2Component } from './components/graph2/graph2.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { CashDepositComponent } from './components/cash-deposit/cash-deposit.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    OtpVerificationComponent,
    BoaccountopeningComponent,
    CompanyProfileComponent,
    SignUpComponent,
    LoginComponent,
    PortfolioComponent,
    GraphComponent,
    Graph2Component,
    WatchlistComponent,
    CashDepositComponent
  ],
  imports: [FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
