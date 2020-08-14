import { Component, OnInit } from '@angular/core';
import { BitCoinService } from '../../services/bit-coin.service';
import { Location } from '@angular/common';
import { Chart } from 'chart.js';
import * as numeral from 'numeral';

@Component({
  selector: 'app-charts',
  styleUrls: ['./app-charts.scss'],
  template: `
  <div class="app-charts col-lg-6 text-center container mt-3">
    <div class="back-edit flex space-between mb-5">
        <p (click)="goBack()" class="btn"><i class="fas fa-arrow-left"></i></p>
    </div>
    <h1 class="mb-3">Statistic</h1>
    <p class="mb-5">BTC: {{bitCoinRate}}</p>
  
      <div class="mb-5" *ngIf="marketPrice">
          <p class="text-center mb-3 font-weight-bold">Average USD market price across major bitcoin exchanges</p>
          <canvas id="marketPrice">{{ marketPrice }}</canvas>
        </div>
      
      
        <div *ngIf="totalUSDvalue">
            <p class="text-center mb-3 font-weight-bold">The total USD value of trading volume on major bitcoin exchanges</p>
            <canvas id="totalUSDvalue">{{ totalUSDvalue }}</canvas>
        </div>
  
  </div>
  `,
})
export class ChartsComponent implements OnInit {

  constructor(private bitcoinService: BitCoinService, private location: Location) { }

  bitCoinRate: number | object = 0;
  marketPrice = [];
  totalUSDvalue = [];

  ngOnInit(): void {
    this.getRate()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getMarketPrice()
      this.getTotalUSDvalue()
    });
  }
  goBack() {
    this.location.back()
  }

  getRate() {
    this.bitcoinService.getRate()
      .subscribe(rate => { this.bitCoinRate = rate });
  }

  getMarketPrice() {
    this.bitcoinService.getMarketPrice()
      .subscribe(marketPrice => {
        let times = marketPrice.values.map(val => this.formatDateToString(val))
        let rates = marketPrice.values.map(val => val.y)
        this.marketPrice = this.createChart(times, rates, 'marketPrice', 'lightblue')
      });
  }

  getTotalUSDvalue() {
    this.bitcoinService.getTotalUSDvalue()
      .subscribe(totalUSDvalue => {
        let times = totalUSDvalue.values.map(val => this.formatDateToString(val))
        let rates = totalUSDvalue.values.map(val => val.y)
        this.totalUSDvalue = this.createChart(times, rates, 'totalUSDvalue', 'lightgreen')
      });
  }

  createChart(times, rates, name, color) {
    return new Chart(name, {
      type: 'bar',
      data: {
        labels: times,
        datasets: [
          {
            data: rates,
            backgroundColor: color,
            fill: true
          }
        ]
      },
      options: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return numeral(value).format('0a');
              }
            }
          }]
        }
      }
    });
  }

  formatDateToString(val) {
    let date = new Date(val.x * 1000)
    let dateFormat = date.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
    return dateFormat
  }

}
