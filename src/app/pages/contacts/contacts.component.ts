import { Component, OnInit } from '@angular/core';
import { Contact } from '../../modals/contact.model';
import { ContactService } from '../../services/contact.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.html',
  styleUrls: ['contacts.scss'],
})
export class ContactsComponent implements OnInit {
  // DATA //
  contacts: Contact[];

  // CREATED //
  constructor(private messageService: MessageService, private contactService: ContactService) { }
  ngOnInit(): void {
    this.contactService.loadContacts()
    this.getContacts();
  }

  // METHODS //
  getContacts() {
    this.contactService.contacts$
      .subscribe(contacts => this.contacts = contacts);
  }

  onRemove(contact: Contact): void {
    this.contactService.deleteContact(contact._id)
  }
}
