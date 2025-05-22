import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { SwiperModule } from 'swiper/angular';
import { TemplateOneComponent } from '@/components/templates/template-one/template-one.component';
import { TemplateTwoComponent } from '@/components/templates/template-two/template-two.component';
import { demoResumeData, demoResumeData2 } from '@/config/data';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [TemplateOneComponent, TemplateTwoComponent],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  ];
}
