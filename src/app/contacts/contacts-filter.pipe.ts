import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './models/contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: true
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[] = [];
    if (term && term.length > 0) {
      filteredContacts = contacts.filter(
        (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (filteredContacts.length < 1) {
      return contacts;
    }
    return filteredContacts;
  }

}
