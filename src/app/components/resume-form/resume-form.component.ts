import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // ✅ IMPORT HERE
  templateUrl: './resume-form.component.html',
})
export class ResumeFormComponent implements OnInit {
  resumeForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.resumeForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      summary: [''],
      experience: this.fb.array([]),
      education: this.fb.array([]),
      skills: ['']
    });

    this.addExperience(); // Add one block initially for testing
  }

  get experience(): FormArray {
    return this.resumeForm.get('experience') as FormArray;
  }

  addExperience(): void {
    this.experience.push(this.fb.group({
      company: [''],
      role: [''],
      years: ['']
    }));
  }

  submit(): void {
    console.log(this.resumeForm.value);
  }
}
