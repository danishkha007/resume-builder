import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template-preview',
  imports: [CommonModule],
  templateUrl: './template-preview.component.html',
  styleUrl: './template-preview.component.scss'
})
export class TemplatePreviewComponent {
  @Input() resumeData: any;
}