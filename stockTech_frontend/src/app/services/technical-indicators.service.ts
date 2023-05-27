import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:4000/api/MACD/';
const baseUrl2 = 'http://localhost:4000/api/EMA50/';
const baseUrl3 = 'http://localhost:4000/api/SMA50/';
const baseUrl4 = 'http://localhost:4000/api/RSI/';
const baseUrl5 = 'http://localhost:4000/api/STOCH/';
const baseUrl6 = 'http://localhost:4000/api/BB/';
const baseUrl7 = 'http://localhost:4000/api/predict/';


 

@Injectable({
  providedIn: 'root'
})
export class TechnicalIndicatorsService {


  constructor(private http: HttpClient) { }

  getMACD(code:string ,dateFrom: string): Observable<any>{
    return this.http.post<any>(baseUrl,{ code: code,dateFrom:dateFrom });
}
  getEMA50(code:string ,dateFrom: string): Observable<any>{
  return this.http.post<any>(baseUrl2,{ code: code,dateFrom:dateFrom });
}
  getSMA50(code:string ,dateFrom: string): Observable<any>{
  return this.http.post<any>(baseUrl3,{ code: code,dateFrom:dateFrom });
}
getRSI(code:string ,dateFrom: string): Observable<any>{
  return this.http.post<any>(baseUrl4,{ code: code,dateFrom:dateFrom });
}

getSTOCH(code:string ,dateFrom: string): Observable<any>{
  return this.http.post<any>(baseUrl5,{ code: code,dateFrom:dateFrom });
}
 
getBB(code:string ,dateFrom: string): Observable<any>{
  return this.http.post<any>(baseUrl6,{ code: code,dateFrom:dateFrom });
}
getPredictions(code:string ,dateFrom: string): Observable<any>{
  return this.http.post<any>(baseUrl7,{ code: code,dateFrom:dateFrom });
}
}
