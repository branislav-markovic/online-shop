import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate() {
    let logged = this.loginService.logged;

    if (!logged) {
      this.router.navigate(["login"]);

      return false;
    }

    return true;
  }
}
