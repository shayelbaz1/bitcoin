import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../../services/contact.service'
import { Contact } from '../../modals/contact.model';
import { UserService } from 'src/app/services/user.service';
import { Move } from 'src/app/modals/move.interface';

@Component({
  selector: 'contact-detail',
  styleUrls: ['./contact-detail.component.scss'],
  templateUrl: './contact-detail.html'
})
export class ContactDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location,
    private router: Router,
    private userService: UserService
  ) { }

  // DATA//
  contact: Contact;
  amount: number;
  currUser;

  // CREATED //
  ngOnInit(): void {
    this.getContact()
    this.userService.getUser().subscribe(user => {
      this.currUser = user
    })
  }

  get moves(): Move[] {
    return this.currUser.moves.map(move => {
      if (move.toId === this.contact._id)
        return move
    })
  }

  transfer() {
    if (!this.amount) return
    if (this.currUser.coins - this.amount < 0) return console.log('You need more coins');
    this.userService.transfer(this.amount, this.contact)
  }
  getContact(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.contactService.getContactById(id)
      .subscribe(contact => { this.contact = contact });
  }

  goBack() {
    this.location.back()
  }

  edit(id) {
    this.router.navigate(['edit/' + id])
  }

}
