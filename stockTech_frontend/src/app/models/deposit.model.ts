export class Deposit {
    bo: string='';
    transID: string='';
    amount: number=0;
    date: Date=new Date();
    phone: string='';
}

export class Withdraw {
    requestID: string='';
    BO:number=0;
    date:Date=new Date();
    amount:number=0;
    status:string=''
}