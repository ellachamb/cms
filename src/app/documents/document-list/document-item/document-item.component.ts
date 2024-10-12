import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Document } from '../../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  imports: [],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document!: Document;
  @Output() documentSelected = new EventEmitter<void>();

  constructor() { }

  onSelected() {
    this.documentSelected.emit();
  }
}
