import { Loan } from "./loan.model";
import { Deposit, Withdraw } from "./withdraw.model";

export class Investor {
    name?: String ;
    BO_account_no?:string;
    phone?:String;
    email?:string;
    nid?:string;
    address?:string;
    bank?:string;
    bankNum?:string;
    withdrawRequests: Withdraw[]=[];
    deposits: Deposit[]=[];
    // loanRequests: Loan[]=[];
}


