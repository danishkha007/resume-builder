import { Component } from '@angular/core';
import { TemplateOneComponent } from '@/components/templates/template-one/template-one.component';
import { TemplateTwoComponent } from '@/components/templates/template-two/template-two.component';
import { demoResumeData, demoResumeData2 } from '@/config/data';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [TemplateOneComponent, TemplateTwoComponent],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {
  templateOneData = demoResumeData;
  templateTwoData = demoResumeData2;
  resumeLayouts = [
    [
      { key: 'personal' },
      { key: 'skills' },
      { key: 'experience' },
      { key: 'education' },
    ],
    [
      { key: 'personal' },
      { key: 'experience' },
      { key: 'skills' },
      { key: 'education' },
    ]
  ]
}
