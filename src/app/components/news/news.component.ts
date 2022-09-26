import { Component, OnInit, Input,Output ,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NewsService } from '../../services/news.service'
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import jwt_decode from 'jwt-decode';




@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit,OnChanges {
  password:string=""
  search: string=""
  public modal=false
  private userRole:any
  private currentUser:any
  private loginUser?:User
  public addedFavClass:string=""
  public addedFav:boolean=false
  private badge:number=0
  
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
  setFavorites(target:User, event:any){
    
    
    if(!event.className.includes('favRed')){
      this.newsService.setFavNews(target)
      event.className = event.className+' favRed'
      this.badge++
    }
    else if(event.className.includes('favRed')){
      event.className=event.className.slice(0, -'favRed'.length)
      let tempArr:any
      this.newsService.favNews$.subscribe(news=>{
        tempArr={...news}
        this.badge--
      })
      this.newsService.setFavNews(tempArr)
    }
    
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
    this.userService.chanceRole( {
      username:this.currentUser.username,
      password:'123',
      email:this.currentUser.email,
      role:this.userRole,
      tmdb_key:this.currentUser.tmdb_key
      
      
    }).subscribe(res=>{
       this.route.navigate(['fav-news'])
      
    })
    // this.userService.login(this.loginUser).subscribe({
     
    //   next:(val)=>{
        
        
    //   },
    //   error:(e)=>{
    //     console.log(e)
    //   },
    //   complete:()=>{
    //     console.log('complete')
        
    //   }
    // })
   
    
  }
ngOnChanges(changes: SimpleChanges): void {
  
}
  
  

}


