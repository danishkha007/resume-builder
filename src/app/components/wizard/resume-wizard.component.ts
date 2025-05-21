// resume-wizard.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormBuilderService } from '@/services/form-builder.service';
import { resumeFormSchema, SectionConfig } from '@/config/form-config';
import { CommonModule } from '@angular/common';
import { demoResumeData2 } from '@/config/data';

@Component({
  selector: 'app-resume-wizard',
  templateUrl: './resume-wizard.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class ResumeWizardComponent {
  schema = resumeFormSchema;
  form: FormGroup;
  schemaKeys: string[] = Object.keys(resumeFormSchema);
  step = 1;

  constructor(private fb: FormBuilder, private formBuilderService: FormBuilderService) {
    this.form = this.formBuilderService.createForm(this.schema);
  }

  get currentSectionKey(): string {
    return this.schemaKeys[this.step - 1];
  }

  get currentSection(): SectionConfig {
    return this.schema[this.currentSectionKey];
  }

  getFormGroup(key: string): FormGroup | null {
    const control = this.form.get(key);
    return control instanceof FormGroup ? control : null;
  }

  getFormArray(key: string): FormArray {
    return this.form.get(key) as FormArray;
  }

  addItem(sectionKey: string) {
    const section = this.schema[sectionKey];
    this.formBuilderService.addFormArrayItem(this.form, sectionKey, section);
  }

  removeItem(sectionKey: string, index: number) {
    this.formBuilderService.removeFormArrayItem(this.form, sectionKey, index);
  }

  nextStep() {
    if (this.step < this.schemaKeys.length) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  @Output() completed = new EventEmitter<any>();
  onSubmit() {
    if (this.form.valid) {
      console.log('Final Resume Data:', this.form.value);
      const data = this.form.value; // or your collected data
      this.completed.emit(data);
    } else {
      this.completed.emit(demoResumeData2);
    }
  }
}