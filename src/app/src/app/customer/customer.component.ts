import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Required for reactive forms
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  customerForm: FormGroup; // FormGroup to manage the customer form

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the customer form with form controls and validation rules
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required], // Customer Name is required
      email: ['', [Validators.required, Validators.email]], // Email is required and must be a valid email format
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]] // Phone is required and must be 10 digits
    });
  }

  /**
   * Handles the form submission.
   * Saves customer data to local storage and navigates to the order page.
   */
  onSubmit(): void {
    if (this.customerForm.valid) {
      // If the form is valid, save the form value to local storage
      localStorage.setItem('customerData', JSON.stringify(this.customerForm.value));
      console.log('Customer data saved:', this.customerForm.value);
      // Navigate to the order page
      this.router.navigate(['/order']);
    } else {
      // If the form is invalid, mark all fields as touched to display validation errors
      this.customerForm.markAllAsTouched();
      console.error('Form is invalid. Please fill in all required fields correctly.');
    }
  }
}
