import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/models/contact.model';

@Component({
  selector: 'cms-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message!: Message;
  
   messageSender!: string;

   constructor(private contactService: ContactService) {}

   ngOnInit() {
      this.contactService.getContact(this.message.sender).subscribe((contact) => {
        if (contact) {
          this.messageSender = contact.name; 
        } else {
          this.messageSender = 'Unknown sender'; 
        }
      });
    }
    
}