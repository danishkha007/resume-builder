// resume-wizard.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormBuilderService } from '@/services/form-builder.service';
import { resumeFormSchema, SectionConfig } from '@/config/form-config';
import { CommonModule } from '@angular/common';

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
      const data = {
        "personal": {
          "firstName": "Danish",
          "lastName": "Khan",
          "email": "khand000786@gmail.com",
          "phone": "7210871786",
          "location": "Noida, Uttar Pradesh",
          "linkedin": "https://www.linkedin.com/in/itsdanishkhan/",
          "summary": "I am a software developer with over 2 years of experience in the industry, specializing in Java and Spring Boot for backend development, and Angular for frontend applications. I have 1.5 years of hands-on experience with Java and more than a year working with Spring Boot, creating robust and scalable applications.\nIn addition to development, I have a strong foundation in testing, with 1 year of experience in manual testing and another year dedicated to automation testing using Selenium and a custom framework. I am passionate about delivering high-quality software and continuously improving my skills.\nI am eager to contribute to innovative projects and collaborate with like-minded professionals."
        },
        "experience": [
          {
            "company": "Tata Consultancy Services",
            "position": "Systems Engineer",
            "from": "June, 2022",
            "to": "",
            "skills": "Core Java, Spring Boot, Microservices, Angulat, HTML, CSS, Selenium, Manual Testing, PostgreSQL",
            "summary": "Worked on Search Application build on Angular using TypeScript, Node and Sinequa SBA Framework. Managed Java API for Downloading files from Azure Blob Storage for different Data Sources.",
            "responsibilities": "Responsible to manage Spring Boot APIs",
          }
        ],
        "education": [
          {
            "school": "United College of Research and Engineering",
            "degree": "Bachelor of Technology",
            "year": "2022",
            "skill": "Core Java, Basic Python, Data Structure & Algorithms, Operating Systems",
            "branch": "Computer Science and Engineering",
            "summary": "I am a software developer with over 2 years of experience in the industry, specializing in Java and Spring Boot for backend development, and Angular for frontend applications."
          },
          {
            "school": "R S S International School",
            "degree": "12th",
            "year": "2018",
            "skill": "Mathematics, Problem Solving, Leadership, Decision Making",
            "branch": "Physics, Chemistry & Maths",
            "summary": "I have 1.5 years of hands-on experience with Java and more than a year working with Spring Boot, creating robust and scalable applications.\nIn addition to development, I have a strong foundation in testing, with 1 year of experience in manual testing and another year dedicated to automation testing using Selenium and a custom framework. I am passionate about delivering high-quality software and continuously improving my skills."
          },
          {
            "school": "R S S International School",
            "degree": "10th/Matriculation",
            "year": "2016",
            "branch": "",
            "skill": "",
            "summary": "I am eager to contribute to innovative projects and collaborate with like-minded professionals."
          }
        ],
        "skills": {
          "skillsList": "Java, Spring Boot, Microservices, Selenium, Angular, ReactJS, JavaScript, HTML, CSS"
        }
      }; // or your collected data
      this.completed.emit(data);
    }
  }
}