import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'MyFakeToken';
  private loginUrl = environment.apiUrl + '/api/auth/login';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return this.token;
  }

  login(form: FormGroup) {
    return this.http.post<any>(this.loginUrl, {
      email: form.controls['email'].value,
      password: form.controls['password'].value
    });
  }
}
