import { Component, OnInit, Input,Output ,EventEmitter } from '@angular/core';
import { NewsService } from '../../services/news.service'
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import jwt_decode from 'jwt-decode';
import { fakeAsync } from '@angular/core/testing';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  password:string=""
  search: string=""
  public modal=false
  private userRole:any
  private currentUser:any
  private loginUser:any
  news:any
  page=10;
  constructor(
    private newsService: NewsService,
    private userService:UsersService,
    private route:Router

  ) { }

  ngOnInit(): void { 
    this.newsService.getLatestNews(this.page).subscribe(news=> {
      this.news=news
    })
   
  }
  onScroll() {
    this.page+=10
    this.newsService.getLatestNews(this.page).subscribe(news=>{
      this.news=news
    })
  }
  clickSearch(){
    this.newsService.searchNews(this.page, this.search).subscribe(news=>{this.news=news})
  }
  setFavorites(target:User){
    this.newsService.setFavNews(target)
  }
  clickFavNews(){
    this.modal=true

  }
  getUserRole(target:any){
    this.userRole=target.value
    console.log(this.userRole)
  }
  chanceUserRole(){
    
    this.currentUser=jwt_decode(localStorage.getItem("accessToken")!)
    this.loginUser={
      email:this.currentUser.email,
      password:this.password
    }
    console.log(this.loginUser)
    this.userService.login(this.loginUser).subscribe({
     
      next:(val)=>{
        this.userService.chanceRole( {
          username:this.currentUser.username,
          password:this.password,
          email:this.currentUser.email,
          role:this.userRole,
          tmdb_key:this.currentUser.tmdb_key
          
          
        }).subscribe(res=>{
           this.route.navigate(['fav-news'])
          this.password=''
        })
        
      },
      error:(e)=>{
        console.log(e.error)
      },
      complete:()=>{
        console.log('complete')
        
      }
    })
   
    
  }

  
  

}


