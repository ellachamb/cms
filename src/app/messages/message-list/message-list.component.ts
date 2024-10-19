import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageItemComponent } from "../message-item/message-item.component";
import { MessageEditComponent } from "../message-edit/message-edit.component";
import { Message } from "../message.model";
import { CommonModule } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  onAddMessage(message: Message) { 
    this.messages.push(message); 
  }
}
