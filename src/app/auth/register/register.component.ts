import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  success = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.success = 'Registered successfully! Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: () => (this.error = 'Registration failed')
    });
  }
}
