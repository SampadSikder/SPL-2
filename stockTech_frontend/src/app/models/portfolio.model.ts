export class Portfolio {
    tradeCode?: String;
    buyingDate?: Date;
    BuyingPrice: number=0.00;
    LTP: number=0.00;
    volume?:number;
    profit:number=0.00;


    constructor(tradeCode?: string, buyingDate?: Date, BuyingPrice: number = 0.00, LTP: number = 0.00, volume?: number) {
        this.tradeCode = tradeCode;
        this.buyingDate = buyingDate;
        this.BuyingPrice = BuyingPrice;
        this.LTP = LTP;
        this.volume = volume;
        this.profit = this.BuyingPrice - this.LTP;
      }
}
