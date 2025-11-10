import { Component } from '@angular/core';
import { RouterOutlet,RouterModule,Router,RouterLinkActive  } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterModule,RouterLinkActive ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  //title = 'SimpleInventory';
  constructor(private router: Router) {}

  // ✅ Show navbar only when logged in and not on login/register
  showNavbar(): boolean {
    const token = localStorage.getItem('jwtToken');
    const hiddenRoutes = ['/login', '/register'];
    return !!token && !hiddenRoutes.includes(this.router.url);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    location.href = '/login';
  }
}
