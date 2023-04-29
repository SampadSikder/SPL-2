export class Withdraw {
    requestID: number=0;
    BO:number=0;
    date:Date=new Date();
    amount:number=0;
    status:string=''
}

export class Deposit {
    bo: string='';
    transID: number=0;
    amount: number=0;
    date: Date=new Date();
}
