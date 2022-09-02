import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { UserOperationService } from 'src/app/services/user-operation/user-operation.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  _id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string
  email: string;
  phone: string;
  address: string;
  products: string;
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

  constructor(private loginService: LoginService, private userOP: UserOperationService) { }

  ngOnInit(): void {
    this.setLoginDetails();
  }

  setLoginDetails() {
    let userData = this.loginService.getUserData();

    this._id = userData._id;
    this.username = userData.username;
    // this.password = userData.password;
    this.firstname = userData.firstname;
    this.lastname = userData.lastname;
    this.email = userData.email;
    this.phone = userData.phone;
    this.address = userData.address;
    this.products = userData.products;
  }

  changeProfileDetails() {
    let userData = this.loginService.getUserData();
    let data = {
      _id: userData._id,
      username: this.username,
      // password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
      address: this.address,
      products: this.products,
    };

    this.loginService.setUserData(data);

    this.setLoginDetails();

    Swal.fire({
      title: 'Informacije o profilu',
      text: 'Uspesno sacuvano',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    
    this.userOP.updateProfile(data);
  }

}
