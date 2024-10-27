import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document!: Document; 
  id!: string; 
  nativeWindow: any;

  constructor(private documentService: DocumentService, 
    private windowRefService: WindRefService, 
    private router: Router,
    private route: ActivatedRoute
    ) {this.nativeWindow = windowRefService.getNativeWindow();}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; 
      this.documentService.getDocument(this.id).subscribe((document) => {
        if (document) {
          this.document = document; 
        } else {
          console.error('Document not found');   
        }
      });
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
 }
}
