import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [], 
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'] 
})
export class ContactDetailComponent implements OnInit {
  @Input() contact!: Contact; 

  constructor() { }

  ngOnInit() {
  }

}