import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required]
    });
  }

  /**
   * Permet d'envoyer le formulaire au back ou de renvoyer une erreur.
   */
  onSubmit() {
    this.submitted = true;
    try {
      this.authService.login(this.loginForm).subscribe((dataUserLogInfo) => {
        this.authService.getUserLogInfo(dataUserLogInfo);
        this.router.navigateByUrl('landing-page');
      });
    } catch {
      this.error = 'Une erreur est survenue.';
    }
  }
}
