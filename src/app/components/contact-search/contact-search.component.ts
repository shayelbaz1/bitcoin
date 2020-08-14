import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-search',
  styleUrls: ['./contact-search.scss'],
  template: `
  <div class="contact-search">
    <div class="flex align-center justify-center mb-5">
        <input class="amount" [(ngModel)]="filterBy.term" (input)="search()" placeholder="Search"/>
        <button (click)="search()" class="btn btn-transfer">
            <span> Search</span></button>
    </div>
  </div>
  `
})
export class ContactSearchComponent implements OnInit {
  constructor(private contactService: ContactService) { }

  filterBy: any = { term: "" }

  search(): void {
    this.contactService.loadContacts(this.filterBy)
  }

  ngOnInit(): void {
  }
}