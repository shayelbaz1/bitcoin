import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'msg-cmp',
  template: `
  <section class="msg-cmp">
  <div *ngIf="messageService.messages.length">

    <h2>Messages</h2>
    <button class="clear" (click)="messageService.clear()">clear</button>
    <div *ngFor='let message of messageService.messages'> {{message}} </div>

  </div>
  </section>
  `,
})
export class MessagesComponent implements OnInit {

  // Created
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
  }

}
