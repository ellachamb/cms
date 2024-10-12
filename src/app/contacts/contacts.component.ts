import { Component, OnInit } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { Contact } from './models/contact.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact!: Contact; 

  constructor() { }

  ngOnInit() {
  }

}