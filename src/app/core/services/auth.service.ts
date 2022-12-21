import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.apiUrl + '/api/auth/login';
  private signupUrl = environment.apiUrl + '/api/auth/signup';

  constructor(private http: HttpClient) { }

  login(form: FormGroup) {
    return this.http.post<any>(this.loginUrl, {
      email: form.controls['email'].value,
      password: form.controls['password'].value
    });
  }

  logout(): void {
    window.sessionStorage.removeItem('token');
  }

  getUserLogInfo(data: any): void {
    window.sessionStorage.setItem('isAdmin', data.isAdmin);
    window.sessionStorage.setItem('token', data.token);
    window.sessionStorage.setItem('userId', data.userId);
  }

  getToken(): string {
    return window.sessionStorage.getItem('token') || '';
  }

  signup(form: FormGroup) {
    return this.http.post<any>(this.signupUrl, {
      firstName: form.controls['firstName'].value,
      lastName: form.controls['lastName'].value,
      email: form.controls['email'].value,
      password: form.controls['password'].value
    });
  }
}
