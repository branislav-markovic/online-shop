import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductInfoComponent } from 'src/app/modals/product-info/product-info.component';
import { UserOperationService } from 'src/app/services/user-operation/user-operation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search: string;
  quantity: number;
  priceMin: number;
  priceMax: number;
  shippingDays: number;
  rating: string;
  productList: Array<Product>;
  showItemAddedMsg: boolean = false;
  selectedCategory: string;
  products: Array<Product> = [];

  constructor(public dialog: MatDialog, private userOP: UserOperationService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:8005/shop/product', {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('accessToken')),
    })
    .subscribe(products => {
      this.products = products['products'];
      this.productList = products['products'];

      this.showCategoryItems('tehnika');
    });

    if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem('cart', JSON.stringify([]));
    }
  }

  showCategoryItems(category) {
    this.products = this.productList;
    this.products = this.products.filter(product => product.className.includes(category)); //product.className.includes(category)

    //nakon izbora nove kategorije reset filtera
    this.priceMin = undefined;
    this.priceMax = undefined;
    this.rating = undefined;
    this.shippingDays = undefined;
    this.quantity = undefined;

    document.querySelectorAll(".catLinks").forEach(item => item.classList.remove("text-muted", "font-italic"));
    document.querySelector(`.${category}Link`).classList.add("text-muted", "font-italic");

    this.selectedCategory = category;
  }

  searchProducts() {
    this.products = this.productList;
    this.products = this.products.filter(product => product.desc.toLowerCase().includes(this.search.toLowerCase()) || product.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  searchQuantity() {
    this.products = this.productList;
    this.products = this.products.filter(product => product.quantity >= this.quantity  && product.className.includes(this.selectedCategory));
  }

  searchPrice() {
    let min = this.priceMin || 0;
    let max = this.priceMax || 0;

    if (max > 0 && min > max) {
      return false;
    }

    this.products = this.productList;

    //
    if (max == 0) {
      this.products = this.products.filter(product => product.price >= this.priceMin && product.className.includes(this.selectedCategory));
    } else if (min == 0) {
      this.products = this.products.filter(product => product.price <= this.priceMax && product.className.includes(this.selectedCategory));
    } else {
      this.products = this.products.filter(product => product.price >= this.priceMin && product.price <= this.priceMax && product.className.includes(this.selectedCategory));
    }
    
  }

  searchDeliveryTime() {
    this.products = this.productList;
    this.products = this.products.filter(product => product.shippingDays <= this.shippingDays && product.className.includes(this.selectedCategory));
  }

  searchRating() {
    let rating = Number.parseFloat(this.rating);

    this.products = this.productList;
    this.products = this.products.filter(product => product.rating >= rating  && product.className.includes(this.selectedCategory));
  }

  resetFilters(param) {
    switch (param) {
      case "kolicina":
        this.quantity = 0;
        this.searchQuantity();
      break;
      case "isporuka":
        this.shippingDays = 100;
        this.searchDeliveryTime();
      break;
      case "ocena":
        this.rating = "0";
        this.searchRating();
      break;
    }
  }

  openDialog(product) {
    const dialogRef = this.dialog.open(ProductInfoComponent, {
      data: {
        product,
      }
    });
  }

  addToCart(product) {
    let data = {
      "product": product.name,
      "vendor" : product.vendor,
      "quantity" : 1,
      "price" : product.price,
      "image" : product.image,
      "sifraProizvoda": product.productCode,
    };

    this.showItemAddedMsg = true;

    this.userOP.addToCart(data);

    setTimeout(() => {this.showItemAddedMsg = false;}, 3000);
  }

  getProductRating(sifraProizvoda) {
    let rating = 0;

    this.userOP.ordersHistory.forEach(item => {
      let products = item.listaProizvoda;

      products.forEach(product => {
        if (product.rated === true && product.rate > 0 && product.sifraProizvoda == sifraProizvoda) {
          let productRate = Number.parseInt(product.rate);

          rating += productRate;
        }
      });
    });

    if (rating) {
      return rating.toFixed(2);
    }

    return "Nije ocenjeno";
  }

}
