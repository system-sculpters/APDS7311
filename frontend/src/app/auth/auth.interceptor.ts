import { HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor 

} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service
    const authToken = this.authService.getToken();
    // Get the userId from the service if needed
    const userId = this.authService.getUserId();

    // Clone the request to add new headers
    const authRequest = req.clone({
      headers: req.headers
        .set("Authorization", `Bearer ${authToken}`) // Add Bearer token to the request
        .set("X-User-Id", userId || '') // Optional: Add userId if available
    });

    // Send the cloned request with the new headers to the next handler
    return next.handle(authRequest);
  }
};