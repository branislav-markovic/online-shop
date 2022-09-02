import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MenuComponent } from './components/layout/menu/menu.component';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardService } from './services/auth/guard/guard.service';
import { ProductInfoComponent } from './modals/product-info/product-info.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersModalComponent } from './modals/orders-modal/orders-modal.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailsComponent } from './modals/details/details.component';
import { CopyrightComponent } from './components/copyright/copyright.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    ProfileComponent,
    ProductInfoComponent,
    OrdersComponent,
    OrdersModalComponent,
    RatingsComponent,
    CartComponent,
    DetailsComponent,
    CopyrightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GuardService, CartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
