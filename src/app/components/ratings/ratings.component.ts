import { Component, OnInit } from '@angular/core';
import { UserOperationService } from 'src/app/services/user-operation/user-operation.service';
import { Orders } from 'src/app/interfaces/orders/orders';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  orders: any;
  vendorList: Array<string> = [];

  constructor(private userOP: UserOperationService) { }

  ngOnInit(): void {
    this.prepareRatings();
  }

  async prepareRatings() {
    let allVendors = {};

    this.userOP.getAllOrders().subscribe(async allOrders => {
        allOrders.forEach(order => {
          let products = order.listaProizvoda;
      
          products.forEach(product => {
            let vendor = product.vendor;
            let comments = product.comment;
    
            if (!comments) {
              return;
            }
            comments["product"] = product.product;
            comments["rate"] = product.rate;

            if (allVendors.hasOwnProperty(vendor)) {
              allVendors[vendor].push(comments);
            } else {
              allVendors[vendor] = [comments];

              this.vendorList.push(vendor);
            }
          });
        });
    
        this.orders = allVendors;
    });
  }

  getVendorImage(vendor) {
    let imgSrc = "";

    switch (vendor.toLowerCase()) {
      case "av market doo":
        imgSrc = "av_market.png";
        break;
      case "tehnomanija":
        imgSrc = "tehnomanija.jpg";
        break;
      case "4audio":
        imgSrc = "4audio.png";
        break;
      case "win win":
        imgSrc = "winwin.png";
        break;
      case "gigatron":
        imgSrc = "gigatron.png";
        break;
      case "pride shop":
        imgSrc = "pride.png";
        break;
      case "atlas sport":
        imgSrc = "atlas.png";
        break;
      case "ring sport":
        imgSrc = "ring.jpg";
        break;
      case "vulkan":
        imgSrc = "vulkan.jpg";
        break;
      case "mikro knjiga":
        imgSrc = "mikroknjiga.jpg";
        break;
      case "laguna":
        imgSrc = "laguna.jpg";
        break;
    }

    return imgSrc;
  }

}
