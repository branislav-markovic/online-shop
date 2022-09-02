import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {

  }

  profile() {
    this.router.navigate(["profile"]);
  }

  logout() {
    Swal.fire({
      title: 'Da li ste sigurni da zelite da se odjavite ?',
      showCancelButton: true,
      confirmButtonText: "Da, odjavi me",
      cancelButtonText: "Ne",
      icon: 'warning',
      confirmButtonColor: '#d9534f',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logged = false;
        sessionStorage.removeItem('logged');

        this.router.navigate(["login"]);
      }
    })
  }

  getUsername() {
    let username = (this.loginService.getUserData() != null ? this.loginService.getUserData().username : "");

    return username;
  }
}
