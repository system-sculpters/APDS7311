import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDisplayComponent } from './transaction/transaction-display/transaction-display.component';
import { TransactionDisplayEmployeeComponent } from './transaction/transaction-display-employee/transaction-display-employee.component';
import { TransactionCreateComponent } from './transaction/transaction-create/transaction-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { EmployeeLoginComponent } from './auth/employee-login/employee-login.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'list', component:TransactionDisplayComponent},
  {path:'transactions', component:TransactionDisplayEmployeeComponent},
  {path:'add', component:TransactionCreateComponent},
  {path:'login', component:LoginComponent},
  {path:'employee-login', component:EmployeeLoginComponent},
  {path:'signup', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 