import { Component, OnInit } from '@angular/core';
import { Contact } from '../../modals/contact.model';
import { User } from '../../modals/user.interface';
import { ContactService } from '../../services/contact.service';
import { UserService } from '../../services/user.service';
import { BitCoinService } from '../../services/bit-coin.service';
import * as numeral from 'numeral';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html',
})
export class HomePage implements OnInit {
  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private bitcoinService: BitCoinService,
    private router: Router
  ) { }

  // DATA //
  contacts: Contact[];
  user: User = null;
  bitCoinUSDRate: string;
  bitCoinNumberRate: number;

  // CREATED //
  ngOnInit() {
    this.contactService.loadContacts()
    this.getUser()
    this.getRate()
    this.getContacts()
  }

  get coinsToUSD() {
    let amountNumber = this.bitCoinNumberRate * this.user.coins
    return numeral(amountNumber).format('$0,0')
  }
  // METHODS //
  getContacts() {
    this.contactService.contacts$
      .subscribe(contacts => { this.contacts = contacts.slice(0, 3) });
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        if (!user) { this.router.navigate(['signup']) }
        else this.user = user
      });
  }

  getRate() {
    this.bitcoinService.getRate()
      .subscribe(rate => {
        let numberRate = 1 / Number(rate)
        let stringRate = numeral(numberRate).format('$0,0')
        this.bitCoinNumberRate = numberRate
        this.bitCoinUSDRate = stringRate
      });
  }

}
