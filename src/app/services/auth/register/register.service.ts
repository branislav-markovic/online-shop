import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient, private router: Router) {

  }

  validateLoginParams(username: string, password: string, repeatPassword: string): boolean {
    username = username.trim();
    password = password.trim();
    repeatPassword = repeatPassword.trim();

    if (!username || !password || (password != repeatPassword)) {
      return false;
    }

    return true;
  }

  register(newUserData) {
    let username = newUserData.username;
    let password = newUserData.password;
    let repeatPassword = newUserData.repeatPassword;

    this.validateLoginParams(username, password, repeatPassword);

    this.http.post<any>('http://localhost:8005/register', newUserData).subscribe(data => {
      if (data.status == 'success') {
        Swal.fire({
          title: 'Registracija',
          text: 'Uspesno ste napravili nalog, sada se mozete prijaviti.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(res => {
          this.router.navigate(["login"]);
        });
      } else {
        Swal.fire({
          title: 'Registracija',
          text: 'Korisnicko ime je zauzeto, proverite jos jednom vase podatke.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
