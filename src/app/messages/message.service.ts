import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = []; 
  maxMessageId: number = 0; 

  constructor(private http: HttpClient) {
    console.log('MessageService constructor called');
  }

  getMessages(): void {
    const url = 'https://cms-project-aaaf0-default-rtdb.firebaseio.com/messages.json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.get<{ [key: string]: Message }>(url, { headers })  
      .subscribe(
        (response: { [key: string]: Message } | null) => {
          console.log('Data from Firebase:', response);

          if (response) {
            this.messages = Object.keys(response).map(key => {
              const message = response[key];
              message.id = key;  // Firebase provides a unique id
              return message;
            });
          } else {
            this.messages = [];
          }

          this.maxMessageId = this.getMaxId(); 
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error('Failed to fetch messages:', error);
        }
      );
  }

  addMessage(newMessage: Message): void {
    if (!newMessage) {
      return;
    }

    this.maxMessageId++; 
    newMessage.id = this.maxMessageId.toString(); 
    this.messages.push(newMessage); 
    this.storeMessages();
  }

  storeMessages(): void {
    const url = 'https://cms-project-aaaf0-default-rtdb.firebaseio.com/messages.json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const messagesString = JSON.stringify(this.messages);

    this.http.put(url, messagesString, { headers })
      .subscribe(
        () => {
          console.log('Messages successfully stored!');
          this.messageChangedEvent.next(this.messages.slice()); 
        },
        (error: any) => {
          console.error('Failed to store messages:', error);
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessage(id: string): Message | null {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }
}
