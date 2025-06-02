import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '', // Default route, redirects to home
    redirectTo: 'home',
    pathMatch: 'full' // Ensures the entire path matches
  },
  {
    path: 'home', // Route for the Home page
    loadComponent: () => import('./src/app/home/home.component').then(m => m.HomeComponent) // Lazy load HomeComponent
  },
  {
    path: 'customer', // Route for the Customer page
    loadComponent: () => import('./src/app/customer/customer.component').then(m => m.CustomerComponent) // Lazy load CustomerComponent
  },
  {
    path: 'order', // Route for the Order page
    loadComponent: () => import('./src/app/order/order.component').then(m => m.OrderComponent) // Lazy load OrderComponent
  },
  {
    path: '**', // Wildcard route for any unmatched paths (e.g., 404 page)
    redirectTo: 'home' // Redirect to home for unknown routes
  }
];
