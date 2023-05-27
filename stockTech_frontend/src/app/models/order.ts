export class Order {
    orderID: string = '';
    bo: string = '';
    date: string = '';
    tradeCode: string = '';
    price: number = 0;
    quantity: number = 0;
    pendingquantity: number = 0;
    order_type: string = '';    //buy/sell
    status: string = ''   //pending/partial/cancelled
}

//executed
export class Transaction {
    transID: string = '';
    orderID: string = '';
    date: string = '';
    tradeCode: string = '';
    order_type: string = '';
    price: number = 0;
    quantity: number = 0;
    orderedPrice:number=0;
    commission:number=0;
    net:number=0;


}