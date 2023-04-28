import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoanComponent } from './components/loan/loan.component';
import { IPOComponent } from './components/ipo/ipo.component';
import { NoticeComponent } from './components/notice/notice.component';
import { WithdrawReqComponent } from './components/withdraw-req/withdraw-req.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'home', component: HomeComponent},
  // {path: 'loan', component: LoanComponent},
  {path: 'ipo', component: IPOComponent},
  {path: 'notice', component: NoticeComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'withdraw', component: WithdrawReqComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
