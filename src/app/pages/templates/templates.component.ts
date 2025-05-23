import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { TemplateOneComponent } from '@/components/templates/template-one/template-one.component';
import { TemplateTwoComponent } from '@/components/templates/template-two/template-two.component';
import { demoResumeData, demoResumeData2 } from '@/config/data';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [TemplateOneComponent, TemplateTwoComponent,],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TemplatesComponent {
  @ViewChild('swiperRef', { static: true }) swiperRef!: ElementRef;
  templateOneData = demoResumeData;
  templateTwoData = demoResumeData2;
  templateTitles = [
    'Template 1',
    'Template 2',
    'Template 3',
    'Template 4',
    'Template 5',
    'Template 6',
    'Template 7',
    'Template 8'
  ];
  currentTitle = this.templateTitles[0];
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

  onSlideChange(event: any) {
    const swiperInstance = event[0]; // Swiper instance
    const activeIndex = swiperInstance.realIndex;
    this.currentTitle = this.templateTitles[activeIndex];
  }

  ngOnChanges($event: Event) {
    if (event?.type) {

    }
    const swiperEl = this.swiperRef.nativeElement;

    // console.log(swiperEl

    // Wait for the swiper instance to be ready
    swiperEl.addEventListener('slidechange', () => {
      const swiper = swiperEl.swiper;

      // Listen for real index changes
      swiper.on('slideChange', () => {
        const realIndex = swiper.realIndex;
        this.currentTitle = this.templateTitles[realIndex];
      });
    });
  }
}
