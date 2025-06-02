import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // For displaying messages
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
 
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule for ngModel
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule, // Import MatIconModule for mat-icon support
    MatSnackBarModule, // Import MatSnackBarModule
    MatDividerModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  customerData: any; // To store customer data retrieved from local storage
  selectedColor: string = ''; // Selected flooring color
  selectedSqFt: number | null = null; // Selected square footage
  estimateCost: number | null = null; // Calculated estimate cost
  discountApplied: boolean = false; // Flag to indicate if discount was applied

  // Predefined lists for colors and square footage options
  colors: string[] = ['Black', 'Gold', 'Lt Gray', 'Brown', 'Red', 'Blue', 'Green'];
  sqFtOptions: number[] = [500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000];

  constructor(private snackBar: MatSnackBar) {} // Inject MatSnackBar

  ngOnInit(): void {
    // Retrieve customer data from local storage when the component initializes
    const storedData = localStorage.getItem('customerData');
    if (storedData) {
      this.customerData = JSON.parse(storedData);
    } else {
      // If no customer data found, display a message
      this.snackBar.open('No customer data found. Please go to the Customer Information page first.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error'] // Custom class for error styling
      });
      console.warn('No customer data found in local storage.');
    }
  }

  /**
   * Calculates the estimated cost based on selected color and square footage.
   * Applies a discount if square footage is greater than 2000.
   */
  calculateEstimate(): void {
    if (this.selectedColor && this.selectedSqFt !== null) {
      const baseCostPerSqFt = 5; // Example base cost per square foot
      let totalCost = this.selectedSqFt * baseCostPerSqFt;
      this.discountApplied = false; // Reset discount flag

      // Apply discount if square footage is greater than 2000
      if (this.selectedSqFt > 2000) {
        const discountRate = 0.10; // 10% discount
        totalCost = totalCost * (1 - discountRate);
        this.discountApplied = true;
        this.snackBar.open('A 10% discount has been applied!', 'Dismiss', {
          duration: 3000,
          panelClass: ['snackbar-success'] // Custom class for success styling
        });
      }

      this.estimateCost = totalCost;
    } else {
      // Display an error message if selections are incomplete
      this.snackBar.open('Please select both color and square footage to get an estimate.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning'] // Custom class for warning styling
      });
      this.estimateCost = null; // Clear previous estimate
    }
  }

  /**
   * Generates a mailto link to send the estimate via email.
   * Note: This will open the user's default email client.
   * Direct sending without user interaction requires a backend server.
   */
  sendEstimateEmail(): void {
    if (this.customerData && this.estimateCost !== null) {
      const subject = encodeURIComponent('A Stain Flooring - Your Estimate');
      const body = encodeURIComponent(
        `Dear ${this.customerData.customerName},\n\n` +
        `Thank you for choosing A Stain Flooring!\n\n` +
        `Here is your flooring estimate details:\n` +
        `Color: ${this.selectedColor}\n` +
        `Square Footage: ${this.selectedSqFt} sq ft\n` +
        (this.discountApplied ? `Discount Applied: Yes (10% for > 2000 sq ft)\n` : `Discount Applied: No\n`) +
        `Estimated Cost: $${this.estimateCost.toFixed(2)}\n\n` +
        `We look forward to working with you!\n\n` +
        `Sincerely,\nA Stain Flooring Team`
      );

      // Construct the mailto link. The recipient is hardcoded as requested.
      const mailtoLink = `mailto:mikew194@gmail.com?subject=${subject}&body=${body}`;

      // Open the mailto link in a new tab/window
      window.open(mailtoLink, '_blank');

      this.snackBar.open('Email client opened with estimate details.', 'Dismiss', {
        duration: 3000,
        panelClass: ['snackbar-info'] // Custom class for info styling
      });
    } else {
      // Display an error if estimate is not calculated or customer data is missing
      this.snackBar.open('Please calculate the estimate first and ensure customer data is available.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }
}