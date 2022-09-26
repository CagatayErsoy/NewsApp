import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable()
export class RoleInterceptor implements HttpInterceptor {
  currentUser:string=""
  constructor( private userService:UsersService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  this.currentUser=localStorage.getItem('accessToken')!
   if(request.url.startsWith(`http://localhost:4231/auth/userupdate`) || request.url.startsWith(`http://localhost:4231/auth/refres-token`)){
    console.log("intercepter here")
   request=request.clone({
      setHeaders:{
        Authorization: `Bearer ${this.currentUser}`
      }
      
    })
   }
    return next.handle(request);
  }
}
