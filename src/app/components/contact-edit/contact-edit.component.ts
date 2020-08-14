import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/modals/contact.model';
import { ContactService } from '../../services/contact.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contact-edit',
  template: `   
  <section class="signup flex justify-center text-center mt-5">
    <form class="form-signin" (submit)="saveContact($event)">
      <img class="mb-4" src="../../../assets/logo.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please Save Contact</h1>
      
      <input type="text" class="form-control mb-3" placeholder="Name" [(ngModel)]="contactToSave.name" name="name" required autofocus>
      <input type="text" class="form-control mb-3" placeholder="Email" [(ngModel)]="contactToSave.email" name="email"/>
      <input type="text" class="form-control mb-3" placeholder="Phone" [(ngModel)]="contactToSave.phone" name="phone"/>
      
      <button class="btn btn-lg btn-success btn-block" type="submit"><i class="far fa-save"></i> Save</button>
      <button class="btn btn-lg btn-warning btn-block" (click)="goBack($event)"><i class="fas fa-arrow-circle-left"></i> Go Back</button>
      <button class="btn btn-lg btn-danger btn-block" *ngIf="contactToSave._id" (click)="onRemove($event)"><i class="far fa-trash-alt"></i> Delete</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
    </form>
  </section>
  `
})
export class ContactEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location,
    private router: Router) { }

  contactToSave: Contact;

  ngOnInit(): void {
    this.getContact()
  }

  setEmptyContact() {
    this.contactToSave = this.contactService.getEmptyContact()
  }
  goBack(ev) {
    ev.preventDefault();
    this.location.back();
  }

  saveContact(ev) {
    ev.preventDefault();
    let contact = this.contactToSave
    if (!contact.name) return
    contact.imgURL = `https://robohash.org/${contact.name[0]}/?set=set5`
    console.log('contact:', contact)
    this.contactService.saveContact(contact)
    this.setEmptyContact()
    this.router.navigate(['/contacts'])
  }

  onRemove(ev): void {
    ev.preventDefault();
    this.contactService.deleteContact(this.contactToSave._id)
    this.router.navigate(['/contacts'])
  }

  getContact(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.setEmptyContact(); return }
    this.contactService.getContactById(id)
      .subscribe(contact => { this.contactToSave = contact });
  }
}
