import { Loan } from "./loan.model";
import { Withdraw } from "./withdraw.model";

export class Investor {
    id: number=0;
    name: string='';
    email: string='';
    phone: string='';
    withdrawRequests: Withdraw[]=[];
    // loanRequests: Loan[]=[];
}


