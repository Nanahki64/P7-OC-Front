import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Permet de retourner à la page d'acceuil.
   */
  onGreeting() {
    this.router.navigateByUrl('landing-page');
  }

  /**
   * Permet de déconnecter l'utilisateur.
   */
  onLogout() {
    this.router.navigateByUrl('');
    this.authService.logout();
  }
}
