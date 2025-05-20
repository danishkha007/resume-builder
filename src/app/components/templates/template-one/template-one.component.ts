import { resumeFormLayout } from '@/config/form-config';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss'],
  imports: [CommonModule]
})
export class TemplateOneComponent {
  @Input() formData: any = {};
  @Input() resumeLayout = resumeFormLayout;

  // Reference all templates using ViewChild
  @ViewChild('personalSection', { static: true }) personalSection!: TemplateRef<any>;
  @ViewChild('experienceSection', { static: true }) experienceSection!: TemplateRef<any>;
  @ViewChild('skillsSection', { static: true }) skillsSection!: TemplateRef<any>;
  @ViewChild('educationSection', { static: true }) educationSection!: TemplateRef<any>;

  templateMap: { [key: string]: TemplateRef<any> } = {};

  ngOnInit(): void {
    this.templateMap = {
      personal: this.personalSection,
      experience: this.experienceSection,
      skills: this.skillsSection,
      education: this.educationSection,
    };
  }

  getSectionTemplate(key: string): TemplateRef<any> | null {
    return this.templateMap[key] || null;
  }

  tempRef(a: any): TemplateRef<any> {
    return a.key as TemplateRef<any>;
  }
}
