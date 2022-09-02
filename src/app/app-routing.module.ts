import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardService } from './services/auth/guard/guard.service';
import { OrdersComponent } from './components/orders/orders.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [GuardService]},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent, canActivate: [GuardService]},
  {path: "profile", component: ProfileComponent, canActivate: [GuardService]},
  {path: "orders", component: OrdersComponent, canActivate: [GuardService]},
  {path: "ratings", component: RatingsComponent, canActivate: [GuardService]},
  {path: "cart", component: CartComponent, canActivate: [GuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
