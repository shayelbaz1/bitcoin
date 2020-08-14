import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Contact } from '../modals/contact.model';
import { MessageService } from './message.service';
import { utils } from './utils.service';

const CONTACTS = initContacts()

function initContacts() {
  const CONTACTS_LIST = [
    {
      "_id": "5a56640269f443a5d64b32ca",
      "name": "Ochoa Hyde",
      "imgURL": `https://robohash.org/Ochoa/?set=set5`,
      "email": "ochoahyde@renovize.com",
      "phone": "+1 (968) 593-3824"
    },
    {
      "_id": "5a5664025f6ae9aa24a99fde",
      "name": "Hallie Mclean",
      "imgURL": `https://robohash.org/Hallie/?set=set5`,
      "email": "halliemclean@renovize.com",
      "phone": "+1 (948) 464-2888"
    },
    {
      "_id": "5a56640252d6acddd183d319",
      "name": "Parsons Norris",
      "imgURL": `https://robohash.org/Parsons/?set=set5`,
      "email": "parsonsnorris@renovize.com",
      "phone": "+1 (958) 502-3495"
    },
    {
      "_id": "5a56640252d6acddd183df19",
      "name": "Moshe Bolo",
      "imgURL": `https://robohash.org/Moshe/?set=set5`,
      "email": "moshebolo@renovize.com",
      "phone": "+1 (958) 502-3324"
    },
  ];
  let contacts = utils.loadFromSessionStorage('contacts')
  if (!contacts) { utils.storeToSessionStorage('contacts', CONTACTS_LIST); return CONTACTS_LIST }
  else return contacts
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //mock the server
  private _contacts: Contact[] = CONTACTS;
  private _contacts$ = new BehaviorSubject<Array<Contact>>([])
  public contacts$ = this._contacts$.asObservable()

  constructor(private messageService: MessageService) { }

  // PRIVATE //
  private log(message: string) {
    this.messageService.add(`ContactService: ${message}`);
  }

  // METHODS //
  public loadContacts(filterBy = null): void {
    let contacts = this._contacts;
    if (filterBy && filterBy.term) {
      contacts = this._filter(filterBy.term, contacts)
    }
    this._contacts$.next(this._sort(contacts))
  }

  public getContactById(id: string): Observable<Contact> {
    this.log('fetch contact with id ' + id)
    //mock the server work
    const contact = this._contacts.find(contact => contact._id === id)
    //return an observable
    return contact ? of(contact) : Observable.throw(`Contact id ${id} not found!`)
  }

  public deleteContact(id: string) {
    //mock the server work
    this._contacts = this._contacts.filter(contact => contact._id !== id)

    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._contacts)
  }

  public saveContact(contact: Contact) {
    console.log('contact:', contact)
    return contact._id ? this._updateContact(contact) : this._addContact(contact)
  }

  private _updateContact(contact: Contact) {
    //mock the server work
    this._contacts = this._contacts.map(c => contact._id === c._id ? contact : c)
    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._sort(this._contacts))
  }

  private _addContact(contact: Contact) {
    //mock the server work
    const newContact = new Contact(contact.name, contact.imgURL, contact.email, contact.phone);
    newContact.setId();
    this._contacts.push(newContact)
    utils.storeToSessionStorage('contacts', this._contacts)
    this._contacts$.next(this._sort(this._contacts))
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    })
  }

  private _filter(term, contacts) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
    })
  }

  public getEmptyContact(): Contact {
    return {
      "name": "",
      "imgURL": "",
      "email": "",
      "phone": ""
    }

  }
}