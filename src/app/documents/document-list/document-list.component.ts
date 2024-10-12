import { Component, Output, EventEmitter } from '@angular/core';
import { DocumentItemComponent } from "./document-item/document-item.component";
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent, CommonModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('1', 'Document 1', 'This is the first document', 'https://www.google.com'),
    new Document('2', 'Document 2', 'This is the second document', 'https://www.google.com'),
    new Document('3', 'Document 3', 'This is the third document', 'https://www.google.com'),
    new Document('4', 'Document 4', 'This is the fourth document', 'https://www.google.com'),
    new Document('5', 'Document 5', 'This is the fifth document', 'https://www.google.com')
  ]; 

  constructor() { }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
