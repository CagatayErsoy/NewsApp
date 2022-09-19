import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private userData:any
  private dataFromLocal:any
  private accessToken?:any
  constructor(
    private userService:UsersService,
    private router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return  (()=>{
        this.userService.userAuthInfo$.subscribe(user=> {this.userData={...user}})
        this.accessToken=localStorage.getItem('accessToken')!
        this.dataFromLocal=jwt_decode(this.accessToken)
        if(this.userData.email){
          return true
        } 
        else if(this.dataFromLocal){
          console.log(this.dataFromLocal)
          return true
        }
        else{
          alert('You are not allowed to view this page. You are redirected to Home Page')
          this.router.navigate(["home"]);        
          return false
        }
      })()
        
      } 
     
      
  }
  

