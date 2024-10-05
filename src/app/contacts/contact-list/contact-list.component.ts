import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from './contact-item/contact-item.component';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg"),
    new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg"),
  ];

  constructor() { }

  ngOnInit() {
  }

  onContactSelected(contact: Contact) { 
    this.selectedContactEvent.emit(contact); 
  }
}
