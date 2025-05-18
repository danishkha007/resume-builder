import { Component } from '@angular/core';
import { TemplateOneComponent } from '@/components/templates/template-one/template-one.component';
import { TemplateTwoComponent } from '@/components/templates/template-two/template-two.component';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [TemplateOneComponent, TemplateTwoComponent],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent { }
