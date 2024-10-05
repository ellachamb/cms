import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageItemComponent } from "../message-item/message-item.component";
import { MessageEditComponent } from "../message-edit/message-edit.component";
import { Message } from "../message.model";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message("1", "Grades", "The grades for this assignment have been posted.", "Bro. Smith"),
    new Message("2", "New Assignment", "There is a new assignment due this Saturday.", "Bro. Jackson"),
    new Message("2", "Late Work", "All late work needs to be turned in before the 14th.", "Bro. Johnson"),
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) { 
    this.messages.push(message); 
  }
}
