import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NewsTemp } from '../interfaces/news-temp'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, tap } from 'rxjs/operators'
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  api = "https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=news&lang=en&media=true"
  searchApi = "https://newscatcher.p.rapidapi.com/v1/search_free?lang=en&media=true"
  httpHeaders = new HttpHeaders().set("X-RapidAPI-Key", "5bd3090b1emsh4eb8caef68a502cp1a9a87jsn318b9253b740")
    .set("X-RapidAPI-Host", "newscatcher.p.rapidapi.com")
  //Fav movie mover
  private favNews = new BehaviorSubject<any[]>([])
  readonly favNews$ = this.favNews.asObservable()
  constructor(private http: HttpClient) {

  }

  getLatestNews(num: number): Observable<NewsTemp> {


    return this.http.get<NewsTemp>(this.api, { headers: this.httpHeaders }).pipe(map((data: any) => data.articles.slice(0, num)))
  }
  searchNews(num: number, keyword: string): Observable<NewsTemp> {
    let httpParams = new HttpParams().set('q', keyword)
    return this.http.get<NewsTemp>(this.searchApi, { headers: this.httpHeaders, params: httpParams }).pipe(map((data: any) => data.articles.slice(0, num)))

  }
  setFavNews(news:User){
    this.favNews.next([...this.favNews.getValue(),news])
  }
}
