import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\'\-\s\é\è]{1,30}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\'\-\s\é\è]{1,30}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\.\-\_\+]+@[a-zA-Z0-9\-\_\+]+.[a-zA-Z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$')]]
    });
  }

  /**
   * Permet d'envoyer le formulaire au back ou de renvoyer une erreur.
   */
  onSubmit() {
    this.submitted = true;
    try {
      this.authService.signup(this.signupForm).subscribe(() => {
        this.router.navigateByUrl('');
      });
    } catch {
      this.error = 'Une erreur est survenue.';
    }
  }

}
