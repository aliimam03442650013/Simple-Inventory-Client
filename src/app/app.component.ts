import { Component } from '@angular/core';
import { RouterOutlet,RouterModule,Router,RouterLinkActive,NavigationEnd   } from '@angular/router';
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
  showSidebar = false;
  constructor(private router: Router) {
    const hiddenRoutes = ['/login', '/register'];
     
    
    setTimeout(() => {
      const currentUrl = this.router.url || '';
      this.showSidebar = !hiddenRoutes.includes(currentUrl);
    }, 0);


    // 👇 This listens to route changes dynamically
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !hiddenRoutes.includes(event.url);
      }
    });
  }

  logout() {
    localStorage.removeItem('jwtToken');
    location.href = '/login';
  }
}
