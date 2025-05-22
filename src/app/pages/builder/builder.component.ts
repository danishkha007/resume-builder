import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TemplateOneComponent } from '@/components/templates/template-one/template-one.component';
import jsPDF from 'jspdf';
import { ResumeWizardComponent } from '@/components/wizard/resume-wizard.component';
import { builderTemplates } from '@/config/form-config';
import html2pdf from 'html2pdf.js';
import { TemplateTwoComponent } from '@/components/templates/template-two/template-two.component';
import { demoResumeData } from '@/config/data';


@Component({
  standalone: true,
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  imports: [CommonModule, DragDropModule, TemplateOneComponent, TemplateTwoComponent, ResumeWizardComponent]
})
export class BuilderComponent {
  @ViewChild('resume') resumeElement!: ElementRef;
  @ViewChild('previewFrame') previewFrame!: ElementRef;

  demoData = demoResumeData;

  resumeForm: FormGroup;
  sections = ['Contact Info', 'Education', 'Experience', 'Skills'];
  previewUrl: string | null = null;
  previewVisible = false;
  resumeData: any = null;      // will hold form data from wizard
  selectedTemplate = 'template-one';

  // html2pdf = html2pdf;

  // You can define your templates list here
  templates = builderTemplates;

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

  onWizardComplete(data: any) {
    this.resumeData = data;
    this.onSave();
    console.log(this.resumeData);
    this.selectedTemplate = this.templates[0].id; // default template
  }

  selectTemplate(id: string) {
    this.selectedTemplate = id;
  }

  editDetails() {
    this.resumeData = null; // reset to show wizard again
  }

  // showPreview() {
  //   if (!this.previewUrl) {
  //     this.onExport(); // Generate PDF and set previewUrl if not already done
  //   }
  //   this.previewVisible = true;
  // }

  // closePreview() {
  //   this.previewVisible = false;
  // }

  constructor(private fb: FormBuilder) {
    this.resumeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      experience: [''],
      education: [''],
      skills: ['']
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }

  onSave() {
    const data = this.resumeForm.value;
    localStorage.setItem('resume-data', JSON.stringify(data));
  }

  onLoad() {
    const saved = localStorage.getItem('resume-data');
    if (saved) {
      this.resumeForm.patchValue(JSON.parse(saved));
    }
  }

  onExport() {
    if (!this.resumeElement) return;
    const element = this.resumeElement.nativeElement;
    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, // makes text sharper
        useCORS: true, // necessary to load external fonts like Google Fonts
      },
      jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    html2pdf().set(opt).from(element).save();

    // const doc = new jsPDF({
    //   orientation: 'p',
    //   unit: 'pt',
    //   format: 'a4', // 595.28 x 841.89 points
    //   // putOnlyUsedFonts: true,
    // });
    // // console.log(doc.getFontList());
    // // doc.setFont('Poppins-ExtraBold');

    // doc.html(this.resumeElement.nativeElement, {
    //   callback: (doc) => {
    //     doc.save('resume.pdf');
    //   },
    //   margin: [30, 30, 30, 30],  // slightly larger margin for cleaner output
    //   autoPaging: 'text',
    //   x: 0,
    //   y: 0,
    //   width: 600,
    //   windowWidth: 900,          // match to the CSS width of the resume container
    //   html2canvas: {
    //     async: true,
    //     useCORS: true,            // if using external images or fonts
    //     scrollY: -window.scrollY,
    //   },
    // });

    // const printContent = this.resumeElement.nativeElement.innerHTML;
    // const WindowPrt = window.open('', '', 'width=800,height=900');
    // if (WindowPrt) {
    //   WindowPrt.document.write(`${printContent}`);
    //   WindowPrt.document.close();
    //   WindowPrt.focus();
    //   setTimeout(() => {
    //     WindowPrt.print();
    //     WindowPrt.close();
    //   }, 500);
    // }
  }
  buildFormFromSchema(schema: any): FormGroup {
    const group: any = {};
    for (const section in schema) {
      group[section] = this.fb.group(schema[section]);
    }
    return this.fb.group(group);
  }
  printIframe() {
    const iframe = this.previewFrame?.nativeElement as HTMLIFrameElement;

    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } else {
      console.error('Unable to access iframe content for printing.');
    }
  }


}
