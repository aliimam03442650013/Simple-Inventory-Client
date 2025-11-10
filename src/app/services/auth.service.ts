// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}
  login(body: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}/login`, body);
  }
//   register(user: any) {
//   return this.http.post('http://localhost:5130/register', user);
// }
  register(body: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}/register`, {
    UserName: body.username,
    Email: body.email,
    Password: body.password
  });
  }
  
}
