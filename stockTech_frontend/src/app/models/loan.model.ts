export class Loan {
    ID: number=0;
    amount: number=0;
    payable: number=0;
    pending: number=0;
    term: number=0;
    issueDate: Date= new Date();
    acceptDate: Date= new Date();
    deadline: Date= new Date();
    status: string='';

    constructor(ID: number, amount: number, term: number, issueDate: Date, acceptDate: Date, status: string) {
        this.ID = ID;
        this.amount = amount;
        this.term = term;
        this.issueDate = issueDate;
        this.acceptDate = acceptDate;
        this.status = status;
        
    
        // Calculate deadline by adding term in months with issue date
        const deadline = new Date(this.issueDate);
        deadline.setMonth(deadline.getMonth() + this.term);
        this.deadline = deadline;

        this.payable=amount+amount*(term/12)*2/100; 
        this.pending=this.payable;
    }
}
