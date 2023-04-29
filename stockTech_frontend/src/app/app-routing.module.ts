import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { BoaccountopeningComponent } from './components/boaccountopening/boaccountopening.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { Graph2Component } from './components/graph2/graph2.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { CashDepositComponent } from './components/cash-deposit/cash-deposit.component';
import { LoanComponent } from './components/loan/loan.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { IPOComponent } from './components/ipo/ipo.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { FAQsComponent } from './components/faqs/faqs.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'news', component: NewsComponent },
  {path: 'signUp', component: SignUpComponent},
  {path: 'phone', component: OtpVerificationComponent},
  {path: 'boaccount', component: BoaccountopeningComponent},
  {path: 'login', component: LoginComponent},
  {path: 'companyProfile', component: CompanyProfileComponent},
  {path: 'graph', component: Graph2Component},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'deposit', component: CashDepositComponent},
  {path: 'loan',component:LoanComponent},
  {path: 'history', component: OrderHistoryComponent},
  {path: 'profile',component:UserProfileComponent},
  {path: 'notification', component:NotificationComponent},
  {path: 'ipo', component:IPOComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'faq', component:FAQsComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
