import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TemplateOneComponent } from '@/components/templates/template-one/template-one.component';
import jsPDF from 'jspdf';
import { ResumeWizardComponent } from '@/components/wizard/resume-wizard.component';

@Component({
  standalone: true,
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  imports: [CommonModule, DragDropModule, TemplateOneComponent, ResumeWizardComponent]
})
export class BuilderComponent {
  @ViewChild('resume') resumeElement!: ElementRef;

  resumeForm: FormGroup;
  sections = ['Contact Info', 'Education', 'Experience', 'Skills'];
  previewUrl: string | null = null;
  previewVisible = false;
  @ViewChild('previewFrame') previewFrame!: ElementRef;

  resumeData: any = null;      // will hold form data from wizard
  selectedTemplate = 'template-one';

  // You can define your templates list here
  templates = [
    { id: 'template-one', name: 'Template One' },
    { id: 'template-two', name: 'Template Two' },
    // Add more templates later
  ];

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
    console.log(this.resumeData);
    this.selectedTemplate = this.templates[0].id; // default template
  }

  selectTemplate(id: string) {
    this.selectedTemplate = id;
  }

  editDetails() {
    this.resumeData = null; // reset to show wizard again
  }

  showPreview() {
    if (!this.previewUrl) {
      this.onExport(); // Generate PDF and set previewUrl if not already done
    }
    this.previewVisible = true;
  }

  closePreview() {
    this.previewVisible = false;
  }

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

    // const doc = new jsPDF({
    //   unit: 'pt',
    //   format: 'a4', // 595.28 x 841.89 points
    // });

    // doc.html(this.resumeElement.nativeElement, {
    //   callback: (doc) => {
    //     doc.save('resume.pdf');
    //   },
    //   margin: [20, 20, 20, 20],  // slightly larger margin for cleaner output
    //   autoPaging: 'text',
    //   x: 0,
    //   y: 0,
    //   html2canvas: {
    //     scale: 0.65,               // adjust scale if your content is larger than A4
    //     width: 800,
    //     useCORS: true,            // if using external images or fonts
    //     scrollY: -window.scrollY,
    //   },
    //   windowWidth: 800,          // match to the CSS width of the resume container
    // });
    const printContent = this.resumeElement.nativeElement.innerHTML;
    const WindowPrt = window.open('', '', 'width=800,height=900');
    if (WindowPrt) {
      WindowPrt.document.write(`${printContent}`);
      WindowPrt.document.close();
      WindowPrt.focus();
      setTimeout(() => {
        WindowPrt.print();
        WindowPrt.close();
      }, 500);
    }
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
