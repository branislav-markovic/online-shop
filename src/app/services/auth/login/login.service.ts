import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user/user';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logged: boolean;
  userData: any;

  constructor(private http:HttpClient, private router: Router) {
    this.logged = (sessionStorage.getItem('logged') == 'true' ? true : false);
  }

  validateLoginParams(username: string, pass: string): boolean {
    username = username.trim();
    pass = pass.trim();

    if (!username || !pass) {
      return false;
    }

    return true;
  }

  login(username: string, password: string) {
    this.validateLoginParams(username, password);

    this.http.post<any>('http://localhost:8005/login', {username, password}).subscribe(data => {
      if (!data || data.status != 'success') {
        Swal.fire({
          title: 'Prijava',
          text: 'Uneli ste neispravne podatke, pokusajte ponovo.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        return false;
      }
   
      //save user data
      this.logged = true;
      this.setUserData(data.user);
      sessionStorage.setItem('logged', 'true');
      sessionStorage.setItem('accessToken', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      this.router.navigate(["home"]);

      return true;
    });
  }

  getUserData() {
    this.userData = JSON.parse(sessionStorage.getItem('user'));
    return this.userData;
  }

  setUserData(data: any) {
    this.userData = data;
    sessionStorage.setItem('user', JSON.stringify(data));
  }
}
