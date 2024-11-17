import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactItemComponent } from "../contact-list/contact-item/contact-item.component";
import { DragDropModule } from '@angular/cdk/drag-drop'

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactItemComponent],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact;
  contact: Contact = new Contact('', '', '', '', '', []);
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;
   
   constructor(
        private contactService: ContactService,
        private router: Router,
        private route: ActivatedRoute) {
        }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.contactService.getContact(this.id).subscribe((contact: Contact | null) => {
        if (!contact) {
          return;
        }

        this.originalContact = contact;
        this.editMode = true;

        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        }
      });
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      this.editMode ? this.contact.id : '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }
  
  onCancel() {
    this.router.navigate(['/documents']);
  }
}
