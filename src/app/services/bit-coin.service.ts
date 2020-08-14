import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { utils } from './utils.service'

@Injectable({
  providedIn: 'root'
})
export class BitCoinService {

  constructor(private http: HttpClient) { }

  /* DATA */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /* METHODS */
  getRate() {
    const url = "https://blockchain.info/tobtc?currency=USD&value=1&cors=true"
    return this.http.get(url)
  }

  getMarketPrice() {
    let marketPrice = utils.loadFromSessionStorage('marketPrice')
    if (marketPrice) return of(marketPrice)
    const url = "https://api.blockchain.info/charts/market-price?timespan=30days&format=json&cors=true"
    marketPrice = this.http.get(url)
      .pipe(
        tap(_ => true),
        catchError(this.handleError('getMarketPrice', 0))
      );
    marketPrice.subscribe(marketPriceRes => {
      utils.storeToSessionStorage('marketPrice', marketPriceRes)
    })
    return marketPrice
  }

  getTotalUSDvalue() {
    let totalUSDvalue = utils.loadFromSessionStorage('totalUSDvalue')
    if (totalUSDvalue) return of(totalUSDvalue)
    const url = "https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true"
    totalUSDvalue = this.http.get(url)
      .pipe(
        tap(_ => true),
        catchError(this.handleError('getMarketPrice', 0))
      );
    totalUSDvalue.subscribe(totalUSDvalueRes => {
      utils.storeToSessionStorage('totalUSDvalue', totalUSDvalueRes)
    })
    return totalUSDvalue
  }



  // PRIVATE //
  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
