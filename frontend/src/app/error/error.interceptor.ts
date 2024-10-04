import { 
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class errorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler){
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) =>{
        let errorMessage = 'An Unknown Error has occured';
        if(error.error.message){
          errorMessage = error.error.message
        }

        this.dialog.open(ErrorComponent, {data:{message:errorMessage}});
        return throwError(error)
      })
    );
  }
};
