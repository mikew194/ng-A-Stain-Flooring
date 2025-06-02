import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'A-Stain Flooring';
  loading = false; // Controls the visibility of the loading spinner

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen for router events to show/hide the loading spinner during navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true; // Show spinner on navigation start
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loading = false; // Hide spinner on navigation end, cancel, or error
      }
    });
  }
}