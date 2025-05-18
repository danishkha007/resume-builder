import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss'],
  imports: [CommonModule]
})
export class TemplateOneComponent {
  @Input() formData: any = {};
}
