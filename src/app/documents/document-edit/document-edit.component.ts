import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  id!: string; 
  originalDocument!: Document;
  document: Document = new Document('', '', '', '');  // Initialize document here
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.documentService.getDocument(this.id).subscribe((doc: Document | null) => {
        if (!doc) {
          return;
        }

        this.originalDocument = doc;
        this.editMode = true;
        
        this.document = { ...this.originalDocument };
      });
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value; 
    const newDocument = new Document(
      this.editMode ? this.document.id : '',
      value.name,
      value.description,
      value.url,
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
