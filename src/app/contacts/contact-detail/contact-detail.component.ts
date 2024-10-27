import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../contact.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'] 
})
export class ContactDetailComponent implements OnInit {
  contact!: Contact; 
  id!: string; 

  constructor(private contactService: ContactService, 
    private router: Router,
    private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.contactService.getContact(this.id).subscribe((contact) => {
          if (contact) {  // Ensure you check for null before assigning
            this.contact = contact; 
          } else {
            console.error('Contact not found');   
            this.router.navigate(['/contacts']); // Redirect if not found
          }
        });
      });
    }    
    onDelete() {
      this.contactService.deleteContact(this.contact);
      this.router.navigate(['/contacts']);
   }
}