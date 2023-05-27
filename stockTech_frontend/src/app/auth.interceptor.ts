import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Get the JWT token from the authentication service
    const authToken = this.authService.getToken();

    // Clone the request and add the JWT token to the request body
    const authRequest = request.clone({
      body: { ...request.body, token: authToken }
    });

    // Pass the modified request to the next interceptor in the chain, or to the server if there are no more interceptors
    return next.handle(authRequest);
  }
}