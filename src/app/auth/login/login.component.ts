import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('jwtToken', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => (this.error = 'Invalid username or password')
    });
  }
}
