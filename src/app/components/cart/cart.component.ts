import { Component, OnInit } from '@angular/core';
import { UserOperationService } from 'src/app/services/user-operation/user-operation.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/modals/details/details.component';
import * as uuid from 'uuid';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  showFinalOrder: boolean = false;
  termsAgree: boolean = false;
  firstname: string;
  lastname: string;
  phone: string;
  city: string;
  postalCode: string;
  address: string;
  total: string;

  constructor(private userOP: UserOperationService, private loginService: LoginService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cartItems = this.userOP.getCartItems();

    let user = this.loginService.getUserData();
    
    this.firstname = (typeof user == "undefined") ? "" : user.username;
    this.lastname = (typeof user == "undefined") ? "" : user.lastname;
    this.phone = (typeof user == "undefined") ? "" : user.phone;
    this.address = (typeof user == "undefined") ? "" : user.address;

    this.total = this.getTotal().toFixed(2);
  }

  deleteItem(sifraProizvoda) {
    this.userOP.deleteItem(sifraProizvoda);

    this.cartItems = this.userOP.getCartItems();

    this.total = this.getTotal().toFixed(2);
  }

  orderDetails() {
    this.showFinalOrder = true;
  }

  cancelOrderDetails() {
    this.showFinalOrder = false;
  }

  makeOrder() {
    Swal.fire({
      title: 'Porudzbina',
      text: 'Uspesno ste narucili proizvode. Aktuelne porudzbine mozete pogledati u delu \"Porudzbine\"',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    //dodaj u porudzbenice
    let productList = [];

    this.cartItems.forEach(item => {
      let product = {
        "sifraProizvoda": item.sifraProizvoda,
        "vendor" : item.vendor,
        "product" : item.product,
        "rated" : false,
        "rate" : null,
        comment: null
      };

      productList.push(product);
    });

    let sifra = uuid.v4();
    let date = new Date();
    let month = date.getMonth() + 1;
    let today = date.getDate() + "." + (month > 9 ? month : "0" + month) + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();

    let data = {
      "sifra": sifra, 
      "datum" : today, 
      "status" : "Tekuca", 
      "proizvodi" : "description",
      "listaProizvoda" : productList,
      "userId" : this.loginService.getUserData()._id,
    };

    this.userOP.saveOrder(data);

    this.cartItems = [];
  }

  detailsModal() {
    this.dialog.open(DetailsComponent);
  }

  getTotal() {
    let total = 0;

    this.cartItems.forEach(item => {
      let quantity = item.quantity;
      let price = item.price;
      let sum = quantity * price;

      total += sum;
    });

    return total;
  }

  updateCart(sifraProizvoda, quantity) {
    this.total = this.getTotal().toFixed(2);

    this.userOP.updateCartItem(sifraProizvoda, quantity);

    this.cartItems = this.userOP.getCartItems();
  }
}
