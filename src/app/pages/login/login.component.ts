import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form with email and password fields
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  // Getter to easily access form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      // Logic to handle login (for now just log the form values)
      console.log(this.loginForm.value);

      // On successful login, redirect to the dashboard or home page
      // For now, redirecting to the signup page
      this.router.navigate(['/builder']); // Adjust this path based on your app's structure
    }
  }
}
