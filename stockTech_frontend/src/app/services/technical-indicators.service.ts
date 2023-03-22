import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:4000/api/MACD';
const baseUrl2 = 'http://localhost:4000/api/EMA50';
const baseUrl3 = 'http://localhost:4000/api/SMA50';


@Injectable({
  providedIn: 'root'
})
export class TechnicalIndicatorsService {

  constructor(private http: HttpClient) { }

  getMACD(): Observable<any>{
    return this.http.get<any>(baseUrl);
}
  getEMA50(): Observable<any>{
  return this.http.get<any>(baseUrl2);
}
  getSMA50(): Observable<any>{
  return this.http.get<any>(baseUrl3);
}
 
}
