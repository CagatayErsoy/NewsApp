import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-fav-news',
  templateUrl: './fav-news.component.html',
  styleUrls: ['./fav-news.component.scss']
})
export class FavNewsComponent implements OnInit {
  savedNews:any
  constructor(
    private newsService:NewsService
  ) { }

  ngOnInit(): void {
    
    this.newsService.favNews$.subscribe(news=>{
      
     this.savedNews=[...news]
    
    })
  }

}
