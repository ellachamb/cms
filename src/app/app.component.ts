import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";


@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ContactsComponent, ContactListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
}
