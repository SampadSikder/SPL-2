import { Loan } from "./loan.model";
import { Deposit, Withdraw } from "./withdraw.model";
import { Portfolio } from "./portfolio.model";
export class Investor {
    name?: string ;
    bo?:string;
    phone?:string;
    email?:string;
    nid?:string;
    address?:string;
    bank?:string;
    ac?:string;
    balance?:number
    withdraw: Withdraw[]=[];
    deposit: Deposit[]=[];
    portfolio: Portfolio[]=[];
}


