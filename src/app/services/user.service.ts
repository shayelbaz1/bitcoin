import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../modals/user.interface';
import { Move } from '../modals/move.interface';
// import { USER } from '../modals/mock-user';
import { USERS } from '../modals/mock-users';
import { utils } from './utils.service';
import { Contact } from '../modals/contact.model';

var USER: User = initUser()

function initUser() {
  let user = utils.loadFromSessionStorage('user')
  return user ? user : null
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  isSignup

  get getIsSignup() {
    return this.isSignup
  }
  getUser(): Observable<User> {
    this.isSignup = (!USER) ? true : false
    console.log('this.isSignup:', this.isSignup)
    return of(USER);
  }

  transfer(amount, contact) {
    const newMove = this.createMove(amount, contact)
    USER.coins = USER.coins - amount
    USER.moves.unshift(newMove)
    utils.storeToSessionStorage('user', USER)
  }

  signup(name: string) {
    console.log('name:', name)
    let user = this.createUser(name)
    USER = user;
    USERS.push(user)
    utils.storeToSessionStorage('user', user)
    return USERS
  }

  createUser(newName: string): User {
    return {
      _id: utils.makeId(),
      name: newName,
      imgURL: `https://robohash.org/${newName}/?set=set5`,
      coins: 100,
      moves: []
    }
  }
  createMove(amount, contact) {
    return {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount: amount
    }
  }

}
