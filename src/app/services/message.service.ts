import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
  
export class MessageService {
  // Data
  messages: string[] = [];

  // Methods
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}