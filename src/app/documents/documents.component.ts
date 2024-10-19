import { Component } from '@angular/core';
import { DocumentListComponent } from "./document-list/document-list.component";
import { DocumentDetailComponent } from "./document-detail/document-detail.component";
import { Document } from './document.model';
import { CommonModule } from '@angular/common';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent, CommonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
 selectedDocument!: Document;

 constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.documentSelectedEvent.subscribe(
      (contact: Document) => {
        this.selectedDocument = contact;
      }
    );
  }
}
