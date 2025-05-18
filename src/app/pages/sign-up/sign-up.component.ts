import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const formData = this.signupForm.value;
    console.log('Signup form submitted:', formData);

    // Example navigation or API call placeholder
    // this.authService.signup(formData).subscribe(() => {
    //   this.router.navigate(['/dashboard']);
    // });

    // For now, just redirect or show success
    alert('Account created successfully!');
    this.router.navigate(['/login']);
  }

  get f() {
    return this.signupForm.controls;
  }
}
