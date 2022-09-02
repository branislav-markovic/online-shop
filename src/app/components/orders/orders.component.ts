import { Component, OnInit, ViewChild } from '@angular/core';
import { Orders } from 'src/app/interfaces/orders/orders';
import { MatDialog } from '@angular/material/dialog';
import { OrdersModalComponent } from 'src/app/modals/orders-modal/orders-modal.component';
import { UserOperationService } from 'src/app/services/user-operation/user-operation.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/services/auth/login/login.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  dataSource = new MatTableDataSource<Orders>();
  dataSourceHistory = new MatTableDataSource();
  displayedColumns:string[] = ["sifra", "datum", "status", "proizvodi", "akcije"];
  displayedColumnsHistory:string[] = ["sifra", "datum", "status", "proizvodi"];
  pageSizeOptions: number[] = [1, 2, 5, 10, 25, 100];

  constructor(public dialog: MatDialog, private userOP: UserOperationService, private http: HttpClient, private loginService: LoginService) {}

  @ViewChild(MatTable) activeTable: MatTable<any>;
  @ViewChild('historyTable') historyTable: MatTable<any>;

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild('historySort') historySort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('historyPaginator') historyPaginator: MatPaginator;

  ngOnInit(): void {
    this.getOrders();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
    this.dataSourceHistory.sort = this.historySort;
    this.dataSource.paginator = this.paginator;
    this.dataSourceHistory.paginator = this.historyPaginator;
  }

  openDialog(order) {
    this.dialog.open(OrdersModalComponent, {
      data: {
        order,
      },
    });
  }

  cancelOrder(sifra, id) {
    Swal.fire({
      title: 'Da li ste sigurni da zelite da otkazete porudzbinu ?',
      showCancelButton: true,
      confirmButtonText: `Da, potvrdjujem`,
      cancelButtonText: `Ne, odustajem`,
      icon: 'warning',
      confirmButtonColor: '#d9534f',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userOP.cancelOrder(sifra, id);
        this.getOrders();
      } 
    })
  }

  getOrders() {
    this.userOP.getOrders().subscribe(orders => {
      this.dataSource.data = orders.filter(order => order.status == 'Tekuca');
      this.dataSourceHistory.data = orders.filter(order => order.status == 'Zavrsena' || order.status == 'Otkazana');
    });
  }

  filterActiveRecords(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  filterHistoryRecords(value) {
    this.dataSourceHistory.filter = value.trim().toLowerCase();
  }
}
