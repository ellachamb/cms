import { Component } from '@angular/core';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = [
    {
      id: "1",
      name: "R. Kent Jackson",
      email: "jacksonk@byui.edu",
      phone: "208-496-3771",
      imageUrl: "../../assets/images/jacksonk.jpg",
      group: [],
    },
    {
      id: "2",
      name: "Rex Barzee",
      email: "barzeer@byui.edu",
      phone: "208-496-3768",
      imageUrl: "../../assets/images/barzeer.jpg",
      group: [],
    },
  ];
}