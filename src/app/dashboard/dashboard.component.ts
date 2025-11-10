import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="shell">
      <h2>Welcome to SimpleInventory</h2>
      <p>Use the navigation above to manage your inventory.</p>
      <a routerLink="/inventory" class="btn">Go to Inventory</a>
    </section>
  `,
  styles: [`
    .shell { max-width: 900px; margin: 24px auto; padding: 16px; }
    .btn { background: #2f62ff; color: white; padding: 10px 14px; border-radius: 8px; text-decoration: none; }
  `]
})

export class DashboardComponent {}
