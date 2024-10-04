import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDisplayComponent } from './transaction/transaction-display/transaction-display.component';
import { TransactionCreateComponent } from './transaction/transaction-create/transaction-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'list', component:TransactionDisplayComponent},
  {path:'add', component:TransactionCreateComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 