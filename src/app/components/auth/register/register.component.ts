import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/auth/register/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  repeatPassword: string;
  firstname: string;
  lastname: string
  email: string;
  phone: string;
  address: string;
  products: string;
  result: boolean;
  productList:any = [
    "Audio komponente",
    "Zvucnici",
    "Racunari",
    "Sportska obuca",
    "Sportska Odeca",
    "Sportski Rekviziti",
    "Strucna literatura",
    "Ostala literatura",
    "Casopisi",
  ];
  
  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {

  }

  register() {
    let userData = {
      username: this.username, 
      password: this.password,
      repeatPassword: this.repeatPassword,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
      address: this.address,
      products: this.products,
    };

    this.registerService.register(userData);
  }

  login() {
    this.router.navigate(["login"]);
  }

}
