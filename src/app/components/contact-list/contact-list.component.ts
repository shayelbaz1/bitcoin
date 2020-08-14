import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../modals/contact.model';

@Component({
  selector: 'contact-list',
  styleUrls: ['./contacts.list.scss'],
  templateUrl: 'contacts-list.html'
})
export class ContactListComponent implements OnInit {
  constructor() { }

  @Input() contacts: Contact[];
  @Output() remove = new EventEmitter();

  onRemove(contact, ev) {
    console.log('contact:', contact)
    ev.stopPropagation()
    this.remove.emit(contact)
  }
  ngOnInit(): void {
  }

}
