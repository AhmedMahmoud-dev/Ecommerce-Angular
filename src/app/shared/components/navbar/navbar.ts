import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite-service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login/login-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isLogedIn: boolean = false;
  private flowbiteService = inject(FlowbiteService);
  private login = inject(LoginService);

  ngOnInit(): void {
    // this.isLogedIn = this.login.userData !== null ? true : false;
    this.login.userData.subscribe({
      next: (response) => {
        this.isLogedIn = response !== null ? true : false;
      }
    })
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  signOut() {
    this.login.logOut();
  }
}