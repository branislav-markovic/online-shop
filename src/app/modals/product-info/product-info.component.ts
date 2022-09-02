import { Component, OnInit } from '@angular/core';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { UserOperationService } from 'src/app/services/user-operation/user-operation.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styles: []
})
export class ProductInfoComponent implements OnInit {
  showItemAddedMsg: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userOP: UserOperationService) {
    
  }

  ngOnInit(): void {
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
}
