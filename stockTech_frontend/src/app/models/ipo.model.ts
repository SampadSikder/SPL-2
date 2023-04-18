export class IPO {
    code: string = '';
    date: Date = new Date();
    price: number = 0;
    quantity: number = 0;
}

export class appliedIPO {
    ipo: IPO = new IPO;
    allocatedQuantity: number = 0;
    applyDate: Date = new Date();
    status: string = '';
}
