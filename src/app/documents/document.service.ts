import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number = 0;

  constructor(private http: HttpClient) {
    console.log('DocumentService initialized');
  }

  storeDocuments(): void {
    const url = 'https://cms-project-aaaf0-default-rtdb.firebaseio.com/documents.json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const documentsString = JSON.stringify(this.documents);

    this.http.put(url, documentsString, { headers })
      .subscribe(
        () => {
          console.log('Documents successfully stored!');
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Failed to store documents:', error);
        }
      );
}

  getDocuments(): void {
    const url = 'https://cms-project-aaaf0-default-rtdb.firebaseio.com/documents.json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    this.http.get<Document[]>(url, { headers })
      .subscribe(
        (documents: Document[] | null) => {
          console.log('Data from Firebase:', documents); 
  
          this.documents = documents || [];  
          this.maxDocumentId = this.getMaxId(); 
          this.documents.sort((a, b) => a.name.localeCompare(b.name)); 
          this.documentListChangedEvent.next(this.documents.slice());  
        },
        (error: any) => {
          console.error('Failed to fetch documents:', error); 
        }
      );
  }
  
  getDocument(id: string): Observable<Document | null> {
    const document = this.documents.find(doc => doc.id === id) || null;
    return of(document); 
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++; 
    newDocument.id = this.maxDocumentId.toString();  
    this.documents.push(newDocument); 
    // const documentsListClone = this.documents.slice();  
    // this.documentListChangedEvent.next(documentsListClone); 
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);  
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;  
    this.documents[pos] = newDocument;  
    // const documentsListClone = this.documents.slice();  
    // this.documentListChangedEvent.next(documentsListClone);  
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);  
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);  
    // const documentsListClone = this.documents.slice();  
    // this.documentListChangedEvent.next(documentsListClone);  
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);  
      if (currentId > maxId) {
        maxId = currentId;  
      }
    }

    return maxId;
  }
}
