import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserOperationService } from 'src/app/services/user-operation/user-operation.service';
import { MatTable } from '@angular/material/table';
import { LoginService } from 'src/app/services/auth/login/login.service';

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styles: []
})
export class OrdersModalComponent implements OnInit {
  currentRating: string = "5";
  commentBoxShow: boolean;
  comment: string;
  commentBox:any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userOP: UserOperationService, private loginService: LoginService) { }


  ngOnInit(): void {
  }


  rateVendor(proizvod, sifraPorudzbine, sifraProizvoda) {
    let textareaBox = (<HTMLInputElement>document.getElementById(`commentBox${sifraProizvoda}`));
    let comment = textareaBox != null ? textareaBox.value : null;

    let data = {
      rated: true,
      rate: this.currentRating,
      comment: comment,
      user: this.loginService.getUserData().username,
    }

    proizvod.rated = true;
    proizvod.rate = this.currentRating;
    this.userOP.updateOrderData(sifraPorudzbine, sifraProizvoda, data);
  }

  addCommentBox(sifraProizvoda) {
    let textareaBox = (<HTMLInputElement>document.getElementById(`commentBoxDiv${sifraProizvoda}`));
    let hidden = textareaBox.style.display == "none";
    let hideshow = "none";

    if (hidden) {
      hideshow = "block";
    }

    textareaBox.style.display = hideshow;
  }
}
