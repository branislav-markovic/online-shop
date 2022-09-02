import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Orders } from 'src/app/interfaces/orders/orders';
import { LoginService } from '../auth/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserOperationService {
  public ordersActive: Array<Orders> = [];

  ordersHistory: Array<Orders> = [];

  cartItems: Array<any> = [];
  total: number;

  apiUrl: string = 'http://localhost:8005';

  constructor(private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {

  }

  getOrderDataActive() {
    return this.ordersActive;
  }

  getOrderDataHistory() { //zavrsene i otkazane
    return this.ordersHistory;
  }

  getOrderDataHistoryAll() {
    const orders = this.ordersHistory;
    
    return orders;
  }

  getCartItems() {
    this.cartItems = JSON.parse(sessionStorage.getItem('cart'));
    
    return this.cartItems;
  }

  updateOrderData(sifraPorudzbenice: string, sifraProizvoda: string, data: any) {
    this.http.post(`${this.apiUrl}/shop/updateOrdersComment`, {
      data,
      sifraPorudzbenice,
      sifraProizvoda
      }, {
        headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('accessToken')),
      }).subscribe(upd => {
        console.log(upd);
    });
  }

  cancelOrder(sifra, id) {
    this.ordersActive.forEach((order, index) => {
      if (order.sifra == sifra) {
        order.status = "Otkazana";
        this.ordersHistory.push(order);
        this.ordersActive.splice(index, 1);
      }
    });

    //delete from db
    this.http.patch(`${this.apiUrl}/shop/orders/${id}`, {}, {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('accessToken')),
    }).subscribe(data => {
      console.log(data);
    });
  }

  addToCart(newItem) {
    let added = false;

    this.cartItems.forEach(item => {
      if (item.sifraProizvoda == newItem.sifraProizvoda) {
        item.quantity++;
        added = true;

        return;
      }
    });

    if (!added) {
      this.cartItems.push(newItem);
    }

    this.persistCart(this.cartItems);

    this.total = 15;
  }

  deleteItem(sifra) {
    this.cartItems = this.cartItems.filter(item => item.sifraProizvoda != sifra);

    this.persistCart(this.cartItems);
  }

  updateCartItem(sifraProizvoda, quantity) {
    this.cartItems.forEach(item => {
      if (item.sifraProizvoda == sifraProizvoda) {
        item.quantity = quantity;

        return;
      }
    });

    this.persistCart(this.cartItems);
  }

  persistCart(items) {
    sessionStorage.setItem("cart", JSON.stringify(items));
  }

  saveOrder(order) {
    this.http.post(`${this.apiUrl}/shop/orders`, {
      data: order,
      }, {
        headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('accessToken')),
      }).subscribe(newOrder => {
        this.ordersActive.push(order);

        //isprazni korpu
        this.cartItems = [];
        sessionStorage.setItem('cart', JSON.stringify([]));
    })
  }

  getOrders(): Observable<any> {
    let orders;
    let subject = new Subject();

    let userId = this.loginService.getUserData()._id
    this.http.get<Orders[]>(`${this.apiUrl}/shop/orders?userId=${userId}`, {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('accessToken')),
    }).subscribe(allOrders => {
      orders = allOrders['orders'];
      subject.next(orders);
    });

    return subject.asObservable();
  }

  getAllOrders(): Observable<any> {
    let orders;
    let subject = new Subject();

    this.http.get<Orders[]>(`${this.apiUrl}/shop/allOrders`, {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('accessToken')),
    }).subscribe(allOrders => {
      orders = allOrders['orders'];
      subject.next(orders);
    });

    return subject.asObservable();
  }


  updateProfile(data) {
    let id = data._id;

    this.http.put(`${this.apiUrl}/users/${id}`, {data}, {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('accessToken')),
    }).subscribe(data => {
      console.log(data);
    });
  }
}
