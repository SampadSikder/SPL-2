export class Order {
    orderID: number = 0;
    bo: string = '';
    date: Date = new Date();
    tradeCode: string = '';
    price: number = 0;
    quantity: number = 0;
    pendingquantity: number = 0;
    type: string = '';    //    buy/sell
    status: string = ''   //    pending/ partial/ cancelled/ executed
}

//executed
export class Transaction {
    transID: number = 0;
    order: Order = new Order();
    date: Date = new Date();
    quantity: number = 0;
}