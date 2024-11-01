import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentItemComponent } from "./document-item/document-item.component";
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../document.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent, CommonModule, RouterModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscription!: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    );
  }
  
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
