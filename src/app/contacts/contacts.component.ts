import { Component, OnInit } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { Contact } from './models/contact.model'; 
import { CommonModule } from '@angular/common';
import { ContactService } from './contact.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactDetailComponent, RouterModule, HttpClientModule],
  providers: [ContactService],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact!: Contact; 

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    );
  }

}