import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  
  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit(): void {

  }

  login() {
    this.loginService.login(this.username, this.password);
  }

  register() {
    this.router.navigate(["register"]);
  }

}
