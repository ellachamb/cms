import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onContactSelected(contact: Contact) { 
    this.contactService.contactSelectedEvent.emit(contact); 
  }
}
