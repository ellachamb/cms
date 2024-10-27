import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DocumentItemComponent } from "./document-item/document-item.component";
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../document.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent, CommonModule, RouterModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = []; 

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments(); 
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents; 
    });
  }
  
}
