import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './models/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = []; 
  maxContactId: number = 0; 

  constructor(private http: HttpClient) { 
    console.log('ContactService initialized');
  }

  storeContacts(): void {
    const url = 'https://cms-project-aaaf0-default-rtdb.firebaseio.com/contacts.json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const contactsString = JSON.stringify(this.contacts);

    this.http.put(url, contactsString, { headers })
      .subscribe(
        () => {
          console.log('Contacts successfully stored!');
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Failed to store contacts:', error);
        }
      );
  }

  getContacts(): void {
    const url = 'https://cms-project-aaaf0-default-rtdb.firebaseio.com/contacts.json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    this.http.get<Contact[]>(url, { headers })
      .subscribe(
        (contacts: Contact[] | null) => {
          console.log('Data from Firebase:', contacts); 
  
          this.contacts = contacts || [];  
          this.maxContactId = this.getMaxId(); 
          this.contacts.sort((a, b) => a.name.localeCompare(b.name)); 
          this.contactListChangedEvent.next(this.contacts.slice());  
        },
        (error: any) => {
          console.error('Failed to fetch contacts:', error); 
        }
      );
  }

  getContact(id: string): Observable<Contact | null> {
    const contact = this.contacts.find(c => c.id === id) || null; 
    return of(contact); 
  }

getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
  
    this.maxContactId++;
    newContact.id = this.maxContactId.toString(); 
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
  
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return; 
    }
  
    newContact.id = originalContact.id; 
    this.contacts[pos] = newContact; 
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
  
}
