import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  styleUrls: ['./signup.component.scss'],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  userToSave = { name: '' }

  ngOnInit(): void {
  }

  signup(ev) {
    ev.preventDefault();
    if (!this.userToSave.name) return
    let users = this.userService.signup(this.userToSave.name)
    console.log('users:', users)
    this.userToSave.name = ''
    this.router.navigate(['home'])
  }
}
