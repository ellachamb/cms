import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { ContactService } from '../contact.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactsFilterPipe } from '../contacts-filter.pipe';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent, RouterModule, ContactsFilterPipe],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription!: Subscription;
  term!: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts();
      this.subscription = this.contactService.contactListChangedEvent.subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
        }
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  search(value: string) {
    this.term = value;
  }

}
