import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionDisplayComponent } from './transaction/transaction-display/transaction-display.component';
import { TransactionCreateComponent } from './transaction/transaction-create/transaction-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { errorInterceptor } from './error/error.interceptor';
import { ErrorComponent } from './error/error/error.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule, } from '@angular/material/table'
import { MatSelectModule  } from '@angular/material/select';
import { HomeComponent } from './home/home.component'
import { MatMenuModule } from '@angular/material/menu';
import { EmployeeLoginComponent } from './auth/employee-login/employee-login.component';
import { TransactionDisplayEmployeeComponent } from './transaction/transaction-display-employee/transaction-display-employee.component';



@NgModule({
  declarations: [
    AppComponent,
    TransactionDisplayComponent,
    TransactionCreateComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ErrorComponent,
    HomeComponent,
    EmployeeLoginComponent,
    TransactionDisplayEmployeeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: errorInterceptor,
      multi:true
    },
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
